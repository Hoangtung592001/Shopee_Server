import { Injectable } from '@nestjs/common';
import { IProductLineList, IProductList } from '$types/interfaces';
import { Connection, Repository } from 'typeorm';
import { AuthService } from '$shared/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import Judge from '$database/entities/Judge';
import { PostJudgeDto } from './dto/post-judge.dto';
import { Exception } from '$helpers/exception';
import { ErrorCode } from '$types/enums';

@Injectable()
export class JudgeService {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
    @InjectRepository(Judge)
    private readonly judgeRepository: Repository<Judge>,
  ) {}
  
  async postJudge(memberId: number, judge: PostJudgeDto) {
    return this.judgeRepository.save({
      memberId: memberId,
      productCode: judge.productCode,
      content: judge.content
    })
  };

  async deleteJudge(memberId: number, judgeId: number) {
    const judge = await this.judgeRepository.createQueryBuilder('j').where('j.member_id = :memberId AND j.id = :judgeId', {
      memberId: memberId,
      judgeId: judgeId
    }).getOne();
    if(!!!judge) {
      throw new Exception(ErrorCode.Delete_Judge_Invalid, 'You are not owner of this judge! Or There is no judge you want to delete!');
    }
    await this.judgeRepository.delete(judge.id);
    return {
      success: true
    };
  }

  async getAllJudgesOfProduct(productCode: number) {
    return this.judgeRepository.createQueryBuilder('j').where('j.productCode = :productCode AND status = 1', {
      productCode: productCode
    }).getMany();
  }
}