import { AllExceptionsFilter } from '$core/filters/http-exception.filter';
import { RolesGuard } from '$core/guards/roles.guard';
import { TransformResponseInterceptor } from '$core/interceptors/transform-res.interceptor';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from '$app/shared/auth/jwt-auth.guard';
import { LoggerMiddleware } from '$core/middleware/logger.middleware';
import { AdminModule } from '$app/admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ShopType from '$database/entities/ShopType';
import Order from '$database/entities/Order';
import OrderDetail from '$database/entities/OrderDetail';
import OrderCart from '$database/entities/OrderCart';
import Notification from '$database/entities/Notification';
import Product from '$database/entities/Product';
import ProductLine from '$database/entities/ProductLine';
import UserRole from '$database/entities/UserRole';
import User from '$database/entities/User';
import { ClientModule } from './client/client.module';
import { ProductModule } from './product/products.module';
import { ProductLineModule } from './productline/productlines.module';
import { NotificationModule } from './notification/notification.module';
import TransferringMethod from '$database/entities/TransferringMethod';
import NotificationType from '$database/entities/NotificationType';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminModule,
    ClientModule,
    ProductModule,
    ProductLineModule,
    NotificationModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
