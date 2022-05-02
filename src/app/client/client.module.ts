import { Module } from '@nestjs/common';
import { AuthModule } from '$shared/auth/auth.module';
import { ProductModule } from './product/product.module';
import { ProductLineModule } from './productline/productlines.module';
import { NotificationModule } from './notification/notification.module';
import { ClientAuthModule } from './client-auth/client-auth.module';
import { MemberModule } from './member/member.module';
import { VoucherModule } from './voucher/voucher.module';
import { LikeModule } from './like/like.module';
import { JudgeModule } from './judge/judge.module';
import { OrderCartModule } from './order-cart/order-cart.module';
import { OrderModule } from './order/order.module';
@Module({
  imports: [
    AuthModule,
    ProductModule,
    ProductLineModule,
    NotificationModule,
    MemberModule,
    ClientAuthModule,
    VoucherModule,
    LikeModule,
    JudgeModule,
    OrderCartModule,
    OrderModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ClientModule {}