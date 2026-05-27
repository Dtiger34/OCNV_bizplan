import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrdersRepository } from '../../orders/orders.repository';
import { EmailService } from '../../email/email.service';
import { OrderStatus } from '../../../common/enums';

const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.PACKING, OrderStatus.CANCELLED],
  [OrderStatus.PACKING]: [OrderStatus.SHIPPING, OrderStatus.CANCELLED],
  [OrderStatus.SHIPPING]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [],
  [OrderStatus.CANCELLED]: [],
};

@Injectable()
export class AdminOrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly emailService: EmailService,
  ) {}

  async findAll(
    page: number,
    limit: number,
    status?: OrderStatus,
  ): Promise<{ items: unknown[]; total: number; page: number; limit: number }> {
    const { data, total } = await this.ordersRepository.findAll(page, limit, status);
    return { items: data, total, page, limit };
  }

  async findById(id: string): Promise<unknown> {
    const order = await this.ordersRepository.findById(id);
    if (!order) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Đơn hàng không tồn tại.' });
    }
    return order;
  }

  async updateStatus(
    id: string,
    newStatus: OrderStatus,
    note?: string,
    trackingCode?: string,
    adminEmail?: string,
  ): Promise<unknown> {
    const order = await this.ordersRepository.findById(id);
    if (!order) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Đơn hàng không tồn tại.' });
    }

    const o = order as any;
    const validNext = VALID_TRANSITIONS[o.status as OrderStatus] ?? [];
    if (!validNext.includes(newStatus)) {
      throw new BadRequestException({
        error: 'INVALID_TRANSITION',
        message: `Không thể chuyển từ ${o.status} sang ${newStatus}.`,
      });
    }

    const historyEntry = { status: newStatus, updatedAt: new Date(), ...(note ? { note } : {}) };
    const update: Record<string, unknown> = {
      status: newStatus,
      $push: { statusHistory: historyEntry },
    };
    if (trackingCode) update['trackingCode'] = trackingCode;
    if (note) update['adminNote'] = note;

    const updated = await this.ordersRepository.updateById(id, update as any);

    if (adminEmail) {
      this.emailService.sendDeliveryUpdateEmail(adminEmail, o.orderCode, newStatus);
    }

    return updated;
  }
}
