import { Module } from '@nestjs/common';
import { ProductLineService } from './productlines.service';
import { ProductLineController } from './productlines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '$shared/auth/auth.module';
import ProductLine from '$database/entities/ProductLine';

@Module({
  imports: [TypeOrmModule.forFeature([ProductLine]), AuthModule],
  controllers: [ProductLineController],
  providers: [ProductLineService],
})
export class ProductLineModule {}
