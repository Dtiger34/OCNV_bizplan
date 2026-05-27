import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../../orders/schemas/order.schema';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { Product, ProductDocument } from '../../products/schemas/product.schema';
import { OrderStatus, PaymentStatus } from '../../../common/enums';

export interface DashboardStatsDto {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  recentOrders: unknown[];
  revenueByPeriod: unknown[];
}

type Period = 'today' | 'week' | 'month' | 'year';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  ) {}

  async getStats(period: string): Promise<DashboardStatsDto> {
    const dateFrom = this.getPeriodStart(period as Period);

    const [totalOrders, totalUsers, totalProducts, revenueAgg, recentOrders, revenueByPeriod] =
      await Promise.all([
        this.orderModel.countDocuments({ createdAt: { $gte: dateFrom } }).exec(),
        this.userModel.countDocuments({ createdAt: { $gte: dateFrom } }).exec(),
        this.productModel.countDocuments({ deletedAt: null }).exec(),
        this.orderModel
          .aggregate([
            { $match: { createdAt: { $gte: dateFrom }, 'payment.status': PaymentStatus.PAID } },
            { $group: { _id: null, total: { $sum: '$total' } } },
          ])
          .exec(),
        this.orderModel
          .find({ createdAt: { $gte: dateFrom } })
          .sort({ createdAt: -1 })
          .limit(10)
          .exec(),
        this.getRevenueByPeriod(dateFrom, period as Period),
      ]);

    return {
      totalRevenue: revenueAgg[0]?.total ?? 0,
      totalOrders,
      totalUsers,
      totalProducts,
      recentOrders,
      revenueByPeriod,
    };
  }

  private getPeriodStart(period: Period): Date {
    const now = new Date();
    switch (period) {
      case 'today': {
        const d = new Date(now);
        d.setHours(0, 0, 0, 0);
        return d;
      }
      case 'week': {
        const d = new Date(now);
        d.setDate(d.getDate() - 7);
        return d;
      }
      case 'month': {
        const d = new Date(now);
        d.setMonth(d.getMonth() - 1);
        return d;
      }
      case 'year': {
        const d = new Date(now);
        d.setFullYear(d.getFullYear() - 1);
        return d;
      }
      default: {
        const d = new Date(now);
        d.setMonth(d.getMonth() - 1);
        return d;
      }
    }
  }

  private async getRevenueByPeriod(dateFrom: Date, period: Period): Promise<unknown[]> {
    const groupFormat =
      period === 'today'
        ? '%Y-%m-%d %H:00'
        : period === 'week' || period === 'month'
          ? '%Y-%m-%d'
          : '%Y-%m';

    return this.orderModel
      .aggregate([
        { $match: { createdAt: { $gte: dateFrom }, 'payment.status': PaymentStatus.PAID } },
        {
          $group: {
            _id: { $dateToString: { format: groupFormat, date: '$createdAt' } },
            revenue: { $sum: '$total' },
            orders: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .exec();
  }
}
