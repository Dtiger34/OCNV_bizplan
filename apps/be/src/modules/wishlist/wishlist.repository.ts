import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Wishlist, WishlistDocument } from './schemas/wishlist.schema';

@Injectable()
export class WishlistRepository {
  constructor(@InjectModel(Wishlist.name) private readonly wishlistModel: Model<WishlistDocument>) {}

  async findByUser(userId: string): Promise<WishlistDocument | null> {
    return this.wishlistModel.findOne({ userId: new Types.ObjectId(userId) }).exec();
  }

  async addProduct(userId: string, productId: string): Promise<WishlistDocument> {
    return this.wishlistModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $addToSet: { productIds: new Types.ObjectId(productId) } },
      { upsert: true, new: true },
    ).exec() as Promise<WishlistDocument>;
  }

  async removeProduct(userId: string, productId: string): Promise<WishlistDocument | null> {
    return this.wishlistModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $pull: { productIds: new Types.ObjectId(productId) } },
      { new: true },
    ).exec();
  }
}
