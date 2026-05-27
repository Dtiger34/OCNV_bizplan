import { Module } from '@nestjs/common';
import { AdminProductsController } from './admin-products.controller';
import { AdminHotspotsController } from './admin-hotspots.controller';
import { AdminProductsService } from './admin-products.service';
import { ProductsModule } from '../../products/products.module';
import { HotspotsModule } from '../../hotspots/hotspots.module';

@Module({
  imports: [ProductsModule, HotspotsModule],
  controllers: [AdminProductsController, AdminHotspotsController],
  providers: [AdminProductsService],
})
export class AdminProductsModule {}
