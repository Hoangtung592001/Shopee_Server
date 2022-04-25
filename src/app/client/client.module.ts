import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '$database/entities/User';
import { AuthModule } from '$shared/auth/auth.module';
import OrderCart from '$database/entities/OrderCart';

@Module({
  imports: [TypeOrmModule.forFeature([User, OrderCart]), AuthModule],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
