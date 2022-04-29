import { Injectable } from '@nestjs/common';
import {
  IUser,
  IToken,
  IPayload,
  IUserLogin,
  IInputChangePassword,
  IRefreshTokenPakage,
  IPrePayload,
} from '$types/interfaces';
import { Connection, Repository, createQueryBuilder } from 'typeorm';
import User from '$database/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '$shared/auth/auth.service';
import { compare, hash } from 'bcrypt';
import { Exception, Unauthorized } from '$helpers/exception';
import { ErrorCode } from '$types/enums';
import config from '$config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MemberService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getPersonalInfo(user: IPrePayload) {
    const hasEmail = await this.userRepository.findOne({
      where: { id: user.id },
      select: ['id', 'email', 'username', 'dateOfBirth'],
    });
    return hasEmail;
  }
}
