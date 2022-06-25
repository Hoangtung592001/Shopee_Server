import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '$shared/auth/auth.module';
import ProductLine from '$database/entities/ProductLine';
import Voucher from '$database/entities/Voucher';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher]), AuthModule],
  controllers: [VoucherController],
  providers: [VoucherService],
})
export class VoucherModule {}