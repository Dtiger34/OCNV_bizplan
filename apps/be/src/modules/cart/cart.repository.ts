import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';

@Injectable()
export class CartRepository {
  constructor(@InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>) {}

  async findByUser(userId: string): Promise<CartDocument | null> {
    return this.cartModel.findOne({ userId: new Types.ObjectId(userId) }).exec();
  }

  async upsertByUser(userId: string, cart: Partial<Cart>): Promise<CartDocument> {
    return this.cartModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $set: cart },
      { upsert: true, new: true },
    ).exec() as Promise<CartDocument>;
  }

  async clearByUser(userId: string): Promise<void> {
    await this.cartModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $set: { items: [] } },
    ).exec();
  }
}
