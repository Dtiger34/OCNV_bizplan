import { Module } from '@nestjs/common';
import { AdminOrdersController } from './admin-orders.controller';
import { AdminOrdersService } from './admin-orders.service';
import { OrdersModule } from '../../orders/orders.module';
import { EmailModule } from '../../email/email.module';

@Module({
  imports: [OrdersModule, EmailModule],
  controllers: [AdminOrdersController],
  providers: [AdminOrdersService],
})
export class AdminOrdersModule {}
