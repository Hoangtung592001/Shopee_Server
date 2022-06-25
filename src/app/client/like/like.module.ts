import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '$shared/auth/auth.module';
import ProductLine from '$database/entities/ProductLine';
import Like from '$database/entities/Like';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), AuthModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
