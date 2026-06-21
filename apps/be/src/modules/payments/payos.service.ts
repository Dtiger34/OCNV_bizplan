import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import * as crypto from 'crypto';

interface PayOSCheckoutData {
  orderCode: number;
  amount: number;
  description: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerAddress: string;
  returnUrl: string;
  cancelUrl: string;
  expiredAt?: number;
}

interface PayOSCheckoutResponse {
  code: string;
  desc: string;
  data?: {
    checkoutUrl: string;
    qrCode: string;
  };
}

interface PayOSPaymentInfo {
  id: string;
  orderCode: number;
  amount: number;
  description: string;
  status: string;
  createdAt: string;
  transactionDateTime: string;
}

@Injectable()
export class PayosService {
  private readonly logger = new Logger(PayosService.name);
  private readonly apiClient: AxiosInstance;
  private readonly clientId: string;
  private readonly apiKey: string;
  private readonly checksumKey: string;

  constructor(private readonly configService: ConfigService) {
    this.clientId = this.configService.get<string>('PAYOS_CLIENT_ID', '');
    this.apiKey = this.configService.get<string>('PAYOS_API_KEY', '');
    this.checksumKey = this.configService.get<string>('PAYOS_CHECKSUM_KEY', '');

    this.apiClient = axios.create({
      baseURL: 'https://api.payos.vn',
      timeout: 10000,
      headers: {
        'x-client-id': this.clientId,
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Tạo đơn hàng checkout trên PayOS
   */
  async createCheckout(data: PayOSCheckoutData): Promise<PayOSCheckoutResponse> {
    if (!this.isConfigured()) {
      throw new BadRequestException('PayOS is not configured');
    }

    try {
      const response = await this.apiClient.post<PayOSCheckoutResponse>('/v1/checkout-page/create', {
        orderCode: data.orderCode,
        amount: data.amount,
        description: data.description,
        buyerName: data.buyerName,
        buyerEmail: data.buyerEmail,
        buyerPhone: data.buyerPhone,
        buyerAddress: data.buyerAddress,
        returnUrl: data.returnUrl,
        cancelUrl: data.cancelUrl,
        expiredAt: data.expiredAt || Math.floor(Date.now() / 1000) + 86400, // 24h
      });

      this.logger.log(`PayOS checkout created for order ${data.orderCode}`);
      return response.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`PayOS checkout failed: ${message}`, error);
      throw new BadRequestException('Failed to create PayOS checkout');
    }
  }

  /**
   * Lấy thông tin thanh toán từ PayOS
   */
  async getPaymentInfo(orderCode: number): Promise<PayOSPaymentInfo> {
    if (!this.isConfigured()) {
      throw new BadRequestException('PayOS is not configured');
    }

    try {
      const response = await this.apiClient.get<{ data: PayOSPaymentInfo }>(
        `/v1/payment-requests/${orderCode}`,
      );

      return response.data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to get PayOS payment info: ${message}`, error);
      throw new BadRequestException('Failed to get payment information');
    }
  }

  /**
   * Hủy đơn hàng trên PayOS
   */
  async cancelPayment(orderCode: number, reason?: string): Promise<void> {
    if (!this.isConfigured()) {
      throw new BadRequestException('PayOS is not configured');
    }

    try {
      await this.apiClient.post(`/v1/payment-requests/${orderCode}/cancel`, {
        reason: reason || 'User cancelled',
      });

      this.logger.log(`PayOS payment cancelled for order ${orderCode}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to cancel PayOS payment: ${message}`, error);
      throw new BadRequestException('Failed to cancel payment');
    }
  }

  /**
   * Xác thực webhook từ PayOS
   * Signature được tính từ: orderCode + amount + description + transactionDateTime
   */
  verifyWebhookSignature(
    orderCode: number,
    amount: number,
    description: string,
    transactionDateTime: string,
    signature: string,
  ): boolean {
    if (!this.checksumKey) {
      return false;
    }

    const data = `${orderCode}${amount}${description}${transactionDateTime}`;
    const computedSignature = crypto
      .createHmac('sha256', this.checksumKey)
      .update(data)
      .digest('hex');

    return computedSignature === signature;
  }

  /**
   * Kiểm tra xem PayOS có được cấu hình không
   */
  private isConfigured(): boolean {
    return !!(this.clientId && this.apiKey && this.checksumKey);
  }
}
