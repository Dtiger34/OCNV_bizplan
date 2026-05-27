import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../orders/schemas/order.schema';
import { verifyReturn } from './payment.helper';
import { PaymentStatus } from '../../common/enums';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

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
}
