import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OrdersRepository } from './orders.repository';
import { Product, ProductDocument } from '../products/schemas/product.schema';
import { Cart, CartDocument } from '../cart/schemas/cart.schema';
import { EmailService } from '../email/email.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersQueryDto } from './dto/get-orders-query.dto';
import { OrderStatus, PaymentMethod, PaymentStatus } from '../../common/enums';

const SHIPPING_FEE = 30000;

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    private readonly emailService: EmailService,
  ) {}

  async createOrder(
    userId: string | null,
    dto: CreateOrderDto,
    clientEmail?: string,
  ): Promise<unknown> {
    const itemDetails: Array<{
      productId: Types.ObjectId;
      productName: string;
      productImageUrl?: string;
      quantity: number;
      unitPrice: number;
      isReviewed: boolean;
    }> = [];

    for (const item of dto.items) {
      const product = await this.productModel.findOne({ _id: item.productId, deletedAt: null }).exec();
      if (!product) {
        throw new NotFoundException({ error: 'NOT_FOUND', message: `Sản phẩm ${item.productId} không tồn tại.` });
      }
      if (product.stock < item.quantity) {
        throw new BadRequestException({
          error: 'OUT_OF_STOCK',
          message: `Sản phẩm ${product.name?.vi ?? ''} không đủ số lượng.`,
        });
      }
      itemDetails.push({
        productId: new Types.ObjectId(item.productId),
        productName: product.name?.vi ?? '',
        productImageUrl: product.images?.[0]?.url,
        quantity: item.quantity,
        unitPrice: product.price,
        isReviewed: false,
      });
    }

    const subtotal = itemDetails.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    const total = subtotal + SHIPPING_FEE;
    const orderCode = `OCNV-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    let paymentUrl: string | undefined;
    if (dto.paymentMethod === PaymentMethod.VNPAY) {
      paymentUrl = `http://localhost:3000/api/v1/payments/mock-return?orderCode=${orderCode}&amount=${total}&status=success`;
    }

    const order = await this.ordersRepository.create({
      orderCode,
      ...(userId ? { userId: new Types.ObjectId(userId) } : {}),
      shippingAddress: dto.shippingAddress,
      items: itemDetails,
      subtotal,
      shippingFee: SHIPPING_FEE,
      total,
      payment: {
        method: dto.paymentMethod,
        status: PaymentStatus.PENDING,
      },
      status: OrderStatus.PENDING,
      statusHistory: [{ status: OrderStatus.PENDING, updatedAt: new Date() }],
      customerNote: dto.customerNote,
    });

    if (userId) {
      await this.cartModel.findOneAndUpdate(
        { userId: new Types.ObjectId(userId) },
        { $set: { items: [] } },
      ).exec();
    }

    if (clientEmail) {
      this.emailService.sendOrderConfirmationEmail(clientEmail, orderCode);
    }

    const orderObj = (order as any).toObject();
    return paymentUrl ? { ...orderObj, paymentUrl } : orderObj;
  }

  async findByUser(
    userId: string,
    query: GetOrdersQueryDto,
  ): Promise<{ items: unknown[]; total: number; page: number; limit: number }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { data, total } = await this.ordersRepository.findByUser(userId, page, limit, query.status);
    return { items: data, total, page, limit };
  }

  async findById(userId: string, id: string): Promise<unknown> {
    const order = await this.ordersRepository.findById(id);
    if (!order) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Đơn hàng không tồn tại.' });
    }
    const o = order as any;
    if (o.userId && String(o.userId) !== userId) {
      throw new ForbiddenException({ error: 'FORBIDDEN', message: 'Không có quyền xem đơn hàng này.' });
    }
    return order;
  }
}
