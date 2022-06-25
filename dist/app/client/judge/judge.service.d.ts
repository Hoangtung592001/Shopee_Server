import { Connection, Repository } from 'typeorm';
import { AuthService } from '$shared/auth/auth.service';
import Judge from '$database/entities/Judge';
import Product from '$database/entities/Product';
import { PostJudgeDto } from './dto/post-judge.dto';
import { GetJudgeDto } from './dto/get-judge.dto';
export declare class JudgeService {
    private readonly connection;
    private readonly authService;
    private readonly judgeRepository;
    private readonly productRepository;
    constructor(connection: Connection, authService: AuthService, judgeRepository: Repository<Judge>, productRepository: Repository<Product>);
    postJudge(memberId: number, judge: PostJudgeDto): Promise<{
        memberId: number;
        productCode: number;
        content: string;
        stars: number;
    } & Judge>;
    deleteJudge(memberId: number, judgeId: number): Promise<{
        success: boolean;
    }>;
    getAllJudgesOfProduct(productCode: number): Promise<Judge[]>;
    getJudge(memberId: number, params: GetJudgeDto): Promise<Judge[]>;
}
