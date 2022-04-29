import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '$shared/auth/auth.module';
import Product from '$database/entities/Product';
import OrderCart from '$database/entities/OrderCart'
import User from '$database/entities/User';
@Module({
  imports: [TypeOrmModule.forFeature([Product, OrderCart, User]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
