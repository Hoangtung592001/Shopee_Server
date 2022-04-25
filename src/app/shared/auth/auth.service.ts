import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from '$types/enums';
import config from '$config';
import { IPayload, IPrePayload, IToken, ITokenPayload } from '$types/interfaces';
import { Repository } from 'typeorm';
import User from '$database/entities/User';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public generateAccessToken(input: IPrePayload): string {
    const payload = {
        ...input
    }
    return this.jwtService.sign(
      { ...payload, tokenType: TokenType.ACCESS_TOKEN },
      {
        secret: config.JWT_SECRET_KEY,
        expiresIn: config.JWT_ACCESS_TOKEN_EXPIRES_IN,
      },
    );
  }

  public generateRefreshToken(input: IPrePayload): string {
    const payload = {
      ...input
    }
    return this.jwtService.sign(
      { ...payload, tokenType: TokenType.REFRESH_TOKEN },
      {
        secret: config.JWT_SECRET_KEY,
        expiresIn: config.JWT_REFRESH_TOKEN_EXPIRES_IN,
      },
    );
  }

  async verifyRefreshToken(refreshToken: string, userRepository: Repository<User>): Promise<IPayload | false> {
      if (!refreshToken) {
          return false;
      }

      const isValid = this.unPackageRefreshOrAccessToken(refreshToken);
    if (!isValid) return false;

    const hasRefreshToken = await userRepository.findOne({ where: { refreshToken: refreshToken }});
    if (!hasRefreshToken) {
        return false;
    }
    return isValid;
  }

  async unPackageRefreshOrAccessToken(token: string): Promise<IPayload | false> {
      try {
        const payload = this.jwtService.verify(token, { secret: config.JWT_SECRET_KEY }) as ITokenPayload;
        return payload.user;
      }
      catch(err) {
          return false;
      }
  }
}
