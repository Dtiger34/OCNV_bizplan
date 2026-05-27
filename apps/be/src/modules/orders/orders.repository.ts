import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { OrderStatus } from '../../common/enums';

@Injectable()
export class OrdersRepository {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>) {}

  async findByUser(
    userId: string,
    page: number,
    limit: number,
    status?: OrderStatus,
  ): Promise<{ data: OrderDocument[]; total: number }> {
    const filter: Record<string, unknown> = { userId: new Types.ObjectId(userId) };
    if (status) filter['status'] = status;
    const [data, total] = await Promise.all([
      this.orderModel.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).exec(),
      this.orderModel.countDocuments(filter).exec(),
    ]);
    return { data, total };
  }

  async findAll(
    page: number,
    limit: number,
    status?: OrderStatus,
  ): Promise<{ data: OrderDocument[]; total: number }> {
    const filter: Record<string, unknown> = {};
    if (status) filter['status'] = status;
    const [data, total] = await Promise.all([
      this.orderModel.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).exec(),
      this.orderModel.countDocuments(filter).exec(),
    ]);
    return { data, total };
  }

  async findById(id: string): Promise<OrderDocument | null> {
    return this.orderModel.findById(id).exec();
  }

  async findByOrderCode(orderCode: string): Promise<OrderDocument | null> {
    return this.orderModel.findOne({ orderCode }).exec();
  }

  async create(data: Partial<Order>): Promise<OrderDocument> {
    return this.orderModel.create(data);
  }

  async updateById(id: string, update: Partial<Order>): Promise<OrderDocument | null> {
    return this.orderModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }
}
