import { JudgeService } from './judge.service';
import { PostJudgeDto } from './dto/post-judge.dto';
import { GetJudgeDto } from './dto/get-judge.dto';
export declare class JudgeController {
    private readonly judgeService;
    constructor(judgeService: JudgeService);
    postJudge(member: Express.User, body: PostJudgeDto): Promise<{
        memberId: number;
        productCode: number;
        content: string;
        stars: number;
    } & import("../../../database/entities/Judge").default>;
    deleteJudge(member: Express.User, id: string): Promise<{
        success: boolean;
    }>;
    getJudge(member: Express.User, query: GetJudgeDto): Promise<import("../../../database/entities/Judge").default[]>;
    getAllJudgesOfProduct(productCode: string): Promise<import("../../../database/entities/Judge").default[]>;
}
