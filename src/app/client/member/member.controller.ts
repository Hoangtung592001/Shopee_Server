import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { MemberService } from './member.service';
import {
  IUserReq,
} from '$types/interfaces';
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}
  @Get('get-personal-info')
  getPersonalInfo(@Req() req: IUserReq) {
      const { tokenType, ...user } = req.user;
      return this.memberService.getPersonalInfo(user);
  }

}
