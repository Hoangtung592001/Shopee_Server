import { Module } from '@nestjs/common';
import { JudgeService } from './judge.service';
import { JudgeController } from './judge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '$shared/auth/auth.module';
import Judge from '$database/entities/Judge';
import Product from '$database/entities/Product';

@Module({
  imports: [TypeOrmModule.forFeature([Judge, Product]), AuthModule],
  controllers: [JudgeController],
  providers: [JudgeService],
})
export class JudgeModule {}
