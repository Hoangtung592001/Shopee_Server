import { IUserReq } from '$types/interfaces';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const UserData = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as IUserReq;

  return request.user;
});
