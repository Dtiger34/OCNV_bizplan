import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Order, OrderDocument } from '../orders/schemas/order.schema';
import { verifyReturn, convertToPayOSOrderCode } from './payment.helper';
import { PaymentStatus } from '../../common/enums';
import { PayosService } from './payos.service';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly payosService: PayosService,
    private readonly configService: ConfigService,
  ) {}

  // ─────────────────────────────────────────────────────────────────────
  // Mock Payment Gateway
  // ─────────────────────────────────────────────────────────────────────

  async handlePaymentReturn(query: Record<string, string>): Promise<{ orderCode: string; success: boolean }> {
    const isValid = verifyReturn(query);
    const orderCode = query['orderCode'];

    if (isValid && orderCode) {
      await this.orderModel.findOneAndUpdate(
        { orderCode },
        { $set: { 'payment.status': PaymentStatus.PAID, 'payment.paidAt': new Date() } },
      ).exec();
    }

    return { orderCode: orderCode ?? '', success: isValid };
  }

  async handlePaymentIpn(query: Record<string, string>): Promise<{ RspCode: string; Message: string }> {
    const isValid = verifyReturn(query);
    const orderCode = query['orderCode'];

    if (isValid && orderCode) {
      await this.orderModel.findOneAndUpdate(
        { orderCode },
        { $set: { 'payment.status': PaymentStatus.PAID, 'payment.paidAt': new Date() } },
      ).exec();
      return { RspCode: '00', Message: 'Confirm success' };
    }

    return { RspCode: '97', Message: 'Invalid signature' };
  }

  // ─────────────────────────────────────────────────────────────────────
  // PayOS Payment
  // ─────────────────────────────────────────────────────────────────────

  async createPayOSCheckout(data: {
    orderCode: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    buyerAddress: string;
  }): Promise<any> {
    // Lấy thông tin đơn hàng từ database
    const order = await this.orderModel.findOne({ orderCode: data.orderCode }).exec();

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    // Chuyển đổi orderCode thành PayOS format (numeric)
    const payosOrderCode = convertToPayOSOrderCode(data.orderCode);

    const returnUrl = this.configService.get<string>('PAYOS_RETURN_URL', 'http://localhost:5173/payment/success');
    const cancelUrl = this.configService.get<string>('PAYOS_CANCEL_URL', 'http://localhost:5173/payment/cancel');

    // Tạo checkout trên PayOS
    const response = await this.payosService.createCheckout({
      orderCode: payosOrderCode,
      amount: Math.floor(order.total), // PayOS yêu cầu số nguyên
      description: `TT ${data.orderCode}`.slice(0, 25),
      buyerName: data.buyerName,
      buyerEmail: data.buyerEmail,
      buyerPhone: data.buyerPhone,
      buyerAddress: data.buyerAddress,
      returnUrl,
      cancelUrl,
    });

    this.logger.log(`PayOS response qrCode type: ${typeof response.qrCode}, value: ${String(response.qrCode).substring(0, 80)}`);

    // Lưu thông tin thanh toán vào đơn hàng
    await this.orderModel.findOneAndUpdate(
      { orderCode: data.orderCode },
      {
        $set: {
          'payment.transactionId': `payos_${payosOrderCode}`,
          'payment.responseCode': response.status,
        },
      },
    ).exec();

    return {
      success: true,
      checkoutUrl: response.checkoutUrl,
      qrCode: response.qrCode,
      paymentLinkId: response.paymentLinkId,
    };
  }

  async getPayOSPaymentStatus(orderCode: string): Promise<any> {
    const order = await this.orderModel.findOne({ orderCode }).exec();

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    const payosOrderCode = convertToPayOSOrderCode(orderCode);

    try {
      const paymentInfo = await this.payosService.getPaymentInfo(payosOrderCode);

      return {
        success: true,
        orderCode,
        paymentStatus: paymentInfo.status,
        amount: paymentInfo.amount,
        transactions: paymentInfo.transactions,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        orderCode,
        error: message,
      };
    }
  }

  async handlePayOSWebhook(body: any): Promise<{ code: string; desc: string }> {
    try {
      const webhookData = await this.payosService.verifyWebhookData(body);
      const { orderCode } = webhookData;

      const order = await this.orderModel.findOne({
        'payment.transactionId': `payos_${orderCode}`,
      }).exec();

      if (order) {
        await this.orderModel.findByIdAndUpdate(order._id, {
          $set: { 'payment.status': PaymentStatus.PAID, 'payment.paidAt': new Date() },
        }).exec();
        this.logger.log(`PayOS payment confirmed for order ${order.orderCode}`);
      }

      return { code: '00', desc: 'Success' };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.warn(`PayOS webhook verification failed: ${message}`);
      return { code: '99', desc: 'Invalid webhook data' };
    }
  }

  async handlePayOSPaymentSuccess(body: any): Promise<any> {
    const { orderCode, amount } = body;

    // Lấy thông tin thanh toán từ PayOS để xác thực
    try {
      const paymentInfo = await this.payosService.getPaymentInfo(orderCode);

      // Tìm kiếm đơn hàng theo PayOS orderCode
      const order = await this.orderModel.findOne({
        'payment.transactionId': `payos_${orderCode}`,
      }).exec();

      if (order && paymentInfo.status === 'PAID') {
        await this.orderModel.findByIdAndUpdate(order._id, {
          $set: {
            'payment.status': PaymentStatus.PAID,
            'payment.paidAt': new Date(),
            'payment.responseCode': paymentInfo.status,
          },
        }).exec();

        return {
          success: true,
          orderCode: order.orderCode,
          message: 'Payment successful',
        };
      }

      return {
        success: false,
        message: 'Order or payment not found',
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`PayOS payment success callback error: ${message}`);
      return {
        success: false,
        error: message,
      };
    }
  }
}
