import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { Product, ProductSchema } from './schemas/product.schema';
import { Review, ReviewSchema } from '../reviews/schemas/review.schema';
import { Order, OrderSchema } from '../orders/schemas/order.schema';
import { HotspotsModule } from '../hotspots/hotspots.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
    HotspotsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService, ProductsRepository, MongooseModule],
})
export class ProductsModule {}
