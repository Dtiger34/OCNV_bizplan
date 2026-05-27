import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { GetProductsQueryDto } from './dto/get-products-query.dto';

@Injectable()
export class ProductsRepository {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

  async findAll(query: GetProductsQueryDto): Promise<{ data: ProductDocument[]; total: number }> {
    const filter: Record<string, unknown> = { isVisible: true, deletedAt: null };
    if (query.villageId) filter['villageId'] = new Types.ObjectId(query.villageId);
    if (query.search) filter['$text'] = { $search: query.search };
    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      filter['price'] = {};
      if (query.minPrice !== undefined) (filter['price'] as Record<string, number>)['$gte'] = query.minPrice;
      if (query.maxPrice !== undefined) (filter['price'] as Record<string, number>)['$lte'] = query.maxPrice;
    }
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const [data, total] = await Promise.all([
      this.productModel.find(filter).skip((page - 1) * limit).limit(limit).exec(),
      this.productModel.countDocuments(filter).exec(),
    ]);
    return { data, total };
  }

  async findFeatured(): Promise<ProductDocument[]> {
    return this.productModel.find({ isFeatured: true, isVisible: true, deletedAt: null }).exec();
  }

  async findById(id: string): Promise<ProductDocument | null> {
    return this.productModel.findOne({ _id: id, deletedAt: null }).exec();
  }

  async adminFindAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ data: ProductDocument[]; total: number }> {
    const filter: Record<string, unknown> = { deletedAt: null };
    if (search) filter['$text'] = { $search: search };
    const [data, total] = await Promise.all([
      this.productModel.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).exec(),
      this.productModel.countDocuments(filter).exec(),
    ]);
    return { data, total };
  }

  async findRelated(villageId: Types.ObjectId, excludeId: string): Promise<ProductDocument[]> {
    return this.productModel
      .find({ villageId, _id: { $ne: excludeId }, isVisible: true, deletedAt: null })
      .limit(6)
      .exec();
  }

  async create(data: Partial<Product>): Promise<ProductDocument> {
    return this.productModel.create(data);
  }

  async updateById(id: string, update: Partial<Product>): Promise<ProductDocument | null> {
    return this.productModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async softDeleteById(id: string): Promise<void> {
    await this.productModel.findByIdAndUpdate(id, { deletedAt: new Date() }).exec();
  }
}
