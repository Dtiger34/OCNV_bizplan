import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
import { AppConfigModule } from './config/config.module';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { VillagesModule } from './modules/villages/villages.module';
import { VillageStagesModule } from './modules/village-stages/village-stages.module';
import { ProductsModule } from './modules/products/products.module';
import { HotspotsModule } from './modules/hotspots/hotspots.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { StaticContentModule } from './modules/static-content/static-content.module';
import { UploadModule } from './modules/upload/upload.module';
import { DashboardModule } from './modules/admin/dashboard/dashboard.module';
import { AdminProductsModule } from './modules/admin/products/admin-products.module';
import { AdminVillagesModule } from './modules/admin/villages/admin-villages.module';
import { AdminOrdersModule } from './modules/admin/orders/admin-orders.module';
import { AdminReviewsModule } from './modules/admin/reviews/admin-reviews.module';
import { AdminUsersModule } from './modules/admin/users/admin-users.module';
import { AdminStaticContentModule } from './modules/admin/static-content/admin-static-content.module';

@Module({
  imports: [
    AppConfigModule,

    LoggerModule.forRoot({
      pinoHttp: {
        redact: ['req.headers.cookie', 'req.headers.authorization'],
      },
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),

    ThrottlerModule.forRoot([{ ttl: 60000, limit: 20 }]),

ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          rootPath: join(process.cwd(), './uploads'),
          serveRoot: '/static',
        },
        {
          rootPath: join(process.cwd(), 'fe', 'dist'),
          exclude: ['/api*', '/static*'],
          serveStaticOptions: {
            index: false,
            // iOS Quick Look từ chối mở AR nếu .usdz không có đúng Content-Type —
            // mime-types mặc định của serve-static không biết type này, trả về
            // application/octet-stream khiến Quick Look âm thầm bounce về trang web.
            setHeaders: (res, path) => {
              if (path.endsWith('.usdz')) {
                res.setHeader('Content-Type', 'model/vnd.usdz+zip');
              }
            },
          },
        },
      ],
    }),

    HealthModule,
    AuthModule,
    UsersModule,
    AddressesModule,
    VillagesModule,
    VillageStagesModule,
    ProductsModule,
    HotspotsModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
    ReviewsModule,
    WishlistModule,
    StaticContentModule,
    UploadModule,
    DashboardModule,
    AdminProductsModule,
    AdminVillagesModule,
    AdminOrdersModule,
    AdminReviewsModule,
    AdminUsersModule,
    AdminStaticContentModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseTransformInterceptor },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
