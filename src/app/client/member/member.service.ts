import { Injectable } from '@nestjs/common';
import { IPrePayload } from '$types/interfaces';
import { Connection, Repository, createQueryBuilder } from 'typeorm';
import User from '$database/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Exception, Unauthorized } from '$helpers/exception';
import { ErrorCode } from '$types/enums';
import { RegisterShopDto } from './dto/RegisterShopDto.dto';
import UserShop from '$database/entities/UserShop';

@Injectable()
export class MemberService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserShop)
    private readonly userShopRepository: Repository<UserShop>,
  ) {}

  async getPersonalInfo(user: IPrePayload) {
    const hasEmail = await this.userRepository.findOne({
      where: { id: user.id },
      select: ['id', 'email', 'username', 'dateOfBirth'],
    });
    return hasEmail;
  }

  async registerShop(memberId: number, info: RegisterShopDto) {
    const userHaveShop = await this.userShopRepository.findOne({ where: { ownerId: memberId }});
    if (!!userHaveShop) {
      throw new Exception(
        ErrorCode.Already_Register_Shop,
        'You have registered shop!',
      );
    }

    return this.userShopRepository.save({
      shopName: info.shopName,
      address: info.address,
      phoneNumber: info.phoneNumber,
      ownerId: memberId,
    });
  }
}
