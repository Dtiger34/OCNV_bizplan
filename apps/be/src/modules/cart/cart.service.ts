import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CartRepository } from './cart.repository';
import { Product, ProductDocument } from '../products/schemas/product.schema';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { MergeCartDto } from './dto/merge-cart.dto';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  ) {}

  private findProduct(id: string): Promise<ProductDocument | null> {
    return this.productModel.findOne({ _id: id, deletedAt: null }).exec();
  }

  async getCart(userId: string): Promise<unknown> {
    return this.cartRepository.findByUser(userId);
  }

  async addItem(userId: string, dto: AddCartItemDto): Promise<unknown> {
    const product = await this.findProduct(dto.productId);
    if (!product) {
      throw new BadRequestException({ error: 'NOT_FOUND', message: 'Sản phẩm không tồn tại.' });
    }
    const p = product as any;
    if (p.stock < dto.quantity) {
      throw new BadRequestException({ error: 'INSUFFICIENT_STOCK', message: 'Không đủ số lượng tồn kho.' });
    }

    const cart = await this.cartRepository.findByUser(userId);
    const items = cart?.items ?? [];
    const existingIndex = items.findIndex(
      (i: any) => String(i.productId) === dto.productId,
    );

    if (existingIndex >= 0) {
      const newQty = items[existingIndex].quantity + dto.quantity;
      if (p.stock < newQty) {
        throw new BadRequestException({ error: 'INSUFFICIENT_STOCK', message: 'Không đủ số lượng tồn kho.' });
      }
      items[existingIndex] = { productId: new Types.ObjectId(dto.productId), quantity: newQty };
    } else {
      items.push({ productId: new Types.ObjectId(dto.productId), quantity: dto.quantity });
    }

    return this.cartRepository.upsertByUser(userId, { items });
  }

  async updateItem(userId: string, productId: string, dto: UpdateCartItemDto): Promise<unknown> {
    const product = await this.findProduct(productId);
    if (!product) {
      throw new BadRequestException({ error: 'NOT_FOUND', message: 'Sản phẩm không tồn tại.' });
    }
    const p = product as any;
    if (p.stock < dto.quantity) {
      throw new BadRequestException({ error: 'INSUFFICIENT_STOCK', message: 'Không đủ số lượng tồn kho.' });
    }

    const cart = await this.cartRepository.findByUser(userId);
    const items = (cart?.items ?? []).map((i: any) =>
      String(i.productId) === productId
        ? { productId: new Types.ObjectId(productId), quantity: dto.quantity }
        : i,
    );

    return this.cartRepository.upsertByUser(userId, { items });
  }

  async removeItem(userId: string, productId: string): Promise<unknown> {
    const cart = await this.cartRepository.findByUser(userId);
    const items = (cart?.items ?? []).filter(
      (i: any) => String(i.productId) !== productId,
    );
    return this.cartRepository.upsertByUser(userId, { items });
  }

  async clearCart(userId: string): Promise<void> {
    return this.cartRepository.clearByUser(userId);
  }

  async mergeCart(userId: string, dto: MergeCartDto): Promise<unknown> {
    const serverCart = await this.cartRepository.findByUser(userId);
    const serverItems: Array<{ productId: Types.ObjectId; quantity: number }> =
      (serverCart?.items ?? []).map((i: any) => ({ productId: i.productId, quantity: i.quantity }));

    for (const guestItem of dto.items) {
      const product = await this.findProduct(guestItem.productId);
      if (!product) continue;
      const p = product as any;
      const idx = serverItems.findIndex((i) => String(i.productId) === guestItem.productId);
      const newQty = idx >= 0
        ? Math.min(serverItems[idx].quantity + guestItem.quantity, p.stock)
        : Math.min(guestItem.quantity, p.stock);

      if (newQty <= 0) continue;

      if (idx >= 0) {
        serverItems[idx].quantity = newQty;
      } else {
        serverItems.push({ productId: new Types.ObjectId(guestItem.productId), quantity: newQty });
      }
    }

    return this.cartRepository.upsertByUser(userId, { items: serverItems });
  }
}
