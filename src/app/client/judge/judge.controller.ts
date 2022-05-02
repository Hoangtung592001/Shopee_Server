import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { JudgeService } from './judge.service';
import {
} from '$types/interfaces';
import { Public } from '$core/decorators/public.decorator';
import { UserData } from '$core/decorators/user.decorator';
import { PostJudgeDto } from './dto/post-judge.dto';
import { GetJudgeDto } from './dto/get-judge.dto';
import { assignLoadMore } from '$helpers/utils';

@Controller('judge')
export class JudgeController {
  constructor(private readonly judgeService: JudgeService) {}

  @Post('post-judge')
  postJudge(@UserData() member: Express.User, @Body() body: PostJudgeDto) {
    return this.judgeService.postJudge(member.id, body);
  }

  @Delete('delete-judge/:id')
  deleteJudge(@UserData() member: Express.User, @Param('id') id: string) {
    return this.judgeService.deleteJudge(member.id, +id);
  }

  @Get('get-judge')
  getJudge(@UserData() member: Express.User, @Query() query: GetJudgeDto) {
    assignLoadMore(query);
    return this.judgeService.getJudge(member.id, query);
  }

  @Public()
  @Get('/:id')
  getAllJudgesOfProduct(@Param('id') productCode: string) {
    return this.judgeService.getAllJudgesOfProduct(+productCode);
  }

}
