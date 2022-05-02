import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '$database/entities/User';
import { AuthModule } from '$shared/auth/auth.module';
import UserShop from '$database/entities/UserShop';
import UserShopType from '$database/entities/UserShopType';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserShop, UserShopType]), AuthModule],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}

