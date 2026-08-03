import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductsRepository } from './products.repository';
import { Review, ReviewDocument } from '../reviews/schemas/review.schema';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewStatus } from '../../common/enums';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    @InjectModel(Review.name) private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async findAll(query: GetProductsQueryDto): Promise<unknown> {
    const { data, total } = await this.productsRepository.findAll(query);
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    return { items: data, total, page, limit };
  }

  async findFeatured(): Promise<unknown[]> {
    return this.productsRepository.findFeatured();
  }

  async findById(id: string): Promise<unknown> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Sản phẩm không tồn tại.' });
    }
    return product;
  }

  async findRelated(id: string): Promise<unknown[]> {
    const product = await this.productsRepository.findById(id);
    if (!product) return [];
    const p = product as any;
    return this.productsRepository.findRelated(p.villageId, id);
  }

  async findReviews(
    productId: string,
    page: number,
    limit: number,
  ): Promise<{ items: unknown[]; total: number; page: number; limit: number }> {
    const filter = { productId: new Types.ObjectId(productId), status: ReviewStatus.APPROVED };
    const [data, total] = await Promise.all([
      this.reviewModel
        .find(filter)
        .populate('userId', 'fullName avatarUrl')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.reviewModel.countDocuments(filter).exec(),
    ]);
    const items = data.map((review) => {
      const obj = review.toObject() as unknown as Record<string, unknown> & {
        userId?: { fullName?: string; avatarUrl?: string } | Types.ObjectId;
      };
      const populatedUser = obj.userId && typeof obj.userId === 'object' && 'fullName' in obj.userId ? obj.userId : undefined;
      return { ...obj, user: populatedUser };
    });
    return { items, total, page, limit };
  }

  async createReview(productId: string, userId: string | undefined, dto: CreateReviewDto): Promise<unknown> {
    const product = await this.productsRepository.findById(productId);
    if (!product) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Sản phẩm không tồn tại.' });
    }

    const review = await this.reviewModel.create({
      productId: new Types.ObjectId(productId),
      ...(userId ? { userId: new Types.ObjectId(userId) } : {}),
      guestName: dto.guestName,
      rating: dto.rating,
      content: dto.content,
      status: ReviewStatus.APPROVED,
    });

    return { success: true, data: review };
  }
}
