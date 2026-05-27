import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { ReviewStatus } from '../../common/enums';

@Injectable()
export class ReviewsRepository {
  constructor(@InjectModel(Review.name) private readonly reviewModel: Model<ReviewDocument>) {}

  async findByProduct(
    productId: string,
    page: number,
    limit: number,
    status?: ReviewStatus,
  ): Promise<{ data: ReviewDocument[]; total: number }> {
    const filter: Record<string, unknown> = {
      productId: new Types.ObjectId(productId),
      status: status ?? ReviewStatus.APPROVED,
    };
    const [data, total] = await Promise.all([
      this.reviewModel.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).exec(),
      this.reviewModel.countDocuments(filter).exec(),
    ]);
    return { data, total };
  }

  async findAll(
    page: number,
    limit: number,
    status?: ReviewStatus,
  ): Promise<{ data: ReviewDocument[]; total: number }> {
    const filter: Record<string, unknown> = {};
    if (status) filter['status'] = status;
    const [data, total] = await Promise.all([
      this.reviewModel.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).exec(),
      this.reviewModel.countDocuments(filter).exec(),
    ]);
    return { data, total };
  }

  async findById(id: string): Promise<ReviewDocument | null> {
    return this.reviewModel.findById(id).exec();
  }

  async create(data: Partial<Review>): Promise<ReviewDocument> {
    return this.reviewModel.create(data);
  }

  async updateById(id: string, update: Partial<Review>): Promise<ReviewDocument | null> {
    return this.reviewModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.reviewModel.findByIdAndDelete(id).exec();
  }
}
