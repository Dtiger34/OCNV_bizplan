import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductsRepository } from './products.repository';
import { Review, ReviewDocument } from '../reviews/schemas/review.schema';
import { Order, OrderDocument } from '../orders/schemas/order.schema';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewStatus, OrderStatus } from '../../common/enums';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    @InjectModel(Review.name) private readonly reviewModel: Model<ReviewDocument>,
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
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
      this.reviewModel.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).exec(),
      this.reviewModel.countDocuments(filter).exec(),
    ]);
    return { items: data, total, page, limit };
  }

  async createReview(productId: string, userId: string, dto: CreateReviewDto): Promise<unknown> {
    const product = await this.productsRepository.findById(productId);
    if (!product) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Sản phẩm không tồn tại.' });
    }

    const purchasedOrder = await this.orderModel.findOne({
      userId: new Types.ObjectId(userId),
      status: OrderStatus.DELIVERED,
      'items.productId': new Types.ObjectId(productId),
    }).exec();

    if (!purchasedOrder) {
      throw new ForbiddenException({
        error: 'FORBIDDEN',
        message: 'Bạn cần mua sản phẩm này trước khi đánh giá.',
      });
    }

    const existingReview = await this.reviewModel.findOne({
      productId: new Types.ObjectId(productId),
      userId: new Types.ObjectId(userId),
    }).exec();

    if (existingReview) {
      throw new ConflictException({ error: 'CONFLICT', message: 'Bạn đã đánh giá sản phẩm này rồi.' });
    }

    return this.reviewModel.create({
      productId: new Types.ObjectId(productId),
      userId: new Types.ObjectId(userId),
      rating: dto.rating,
      content: dto.content,
      status: ReviewStatus.PENDING,
    });
  }
}
