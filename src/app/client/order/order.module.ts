import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '$shared/auth/auth.module';
import OrderDetail from '$database/entities/OrderDetail';
import Order from '$database/entities/Order';
import Product from '$database/entities/Product';
import Voucher from '$database/entities/Voucher';
@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, Product, Voucher]), AuthModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
