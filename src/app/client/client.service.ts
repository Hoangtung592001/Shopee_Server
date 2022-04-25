import { Injectable } from '@nestjs/common';
import { purchasingProductList, IPrePayload } from '$types/interfaces';
import {
  Connection,
  Repository,
  getRepository,
  createQueryBuilder,
} from 'typeorm';
import User from '$database/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '$shared/auth/auth.service';
import { compare, hash } from 'bcrypt';
import { Exception, Unauthorized } from '$helpers/exception';
import { ErrorCode } from '$types/enums';
import config from '$config';
import { JwtService } from '@nestjs/jwt';
import OrderCart from '$database/entities/OrderCart';

@Injectable()
export class ClientService {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(OrderCart)
    private readonly orderCartRepository: Repository<OrderCart>,
  ) {}

  async getPersonalInfo(user: IPrePayload) {
    const hasEmail = await this.userRepository.findOne({
      where: { id: user.id },
      select: ['id', 'email', 'username', 'dateOfBirth'],
    });
    return hasEmail;
  }

  async addProductsToCart(
    productList: purchasingProductList,
  ): Promise<purchasingProductList | any> {
    try {
      this.orderCartRepository.insert(productList);
      return {
        success: true
      }
    } catch (error) {
      throw new Exception(ErrorCode.Unknown_Error, error.message);
    }
  }

  
}
