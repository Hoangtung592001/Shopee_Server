import { LikeService } from './like.service';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    likeProduct(member: Express.User, productCode: string): Promise<{
        success: boolean;
    }>;
    getNumberOfLikes(productCode: string): Promise<any>;
}
