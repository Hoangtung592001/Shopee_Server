import { Module } from '@nestjs/common';
import { JudgeService } from './judge.service';
import { JudgeController } from './judge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '$shared/auth/auth.module';
import Judge from '$database/entities/Judge';

@Module({
  imports: [TypeOrmModule.forFeature([Judge]), AuthModule],
  controllers: [JudgeController],
  providers: [JudgeService],
})
export class JudgeModule {}
