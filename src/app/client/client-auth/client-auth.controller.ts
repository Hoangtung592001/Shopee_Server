import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
  ForbiddenException,
  ParseIntPipe,
  UsePipes,
  Req,
} from '@nestjs/common';
import { ClientAuthService } from './client-auth.service';
import {
  IUser,
  IUserLogin,
  IUserReq,
  IPayload,
  IInputChangePassword,
  IRefreshTokenPakage,
  IPrePayload,
} from '$types/interfaces';
import { Public } from '$core/decorators/public.decorator';
import { Request } from 'express';
import { Roles } from '$core/decorators/roles.decorator';
import { Role } from '$types/enums';
import { type } from 'os';
@Controller('client-auth')
export class ClientAuthController {
  constructor(private readonly clientAuthService: ClientAuthService) {}
  @Public()
  @Post('signup')
  signUp(@Body() body: IUser) {
    return this.clientAuthService.signUp(body);
  }

  @Public()
  @Post('signin')
  signIn(@Body() body: IUserLogin) {
    return this.clientAuthService.signIn(body);
  }

  @Post('change-password')
  async changePassword(@Req() req: IUserReq) {
    const body = req.body as IInputChangePassword;
    const user = req.user as any as IPayload;
    const { tokenType, ...payload } = user;
    return await this.clientAuthService.changePassword(body, payload);
  }

  @Public()
  @Post('refresh-access-token')
  async refreshAccessToken(@Req() req: Request) {
    const body = req.body as IRefreshTokenPakage;
    return this.clientAuthService.refreshAccessToken(body);
  }
}
