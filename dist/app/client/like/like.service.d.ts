import { Connection, Repository } from 'typeorm';
import { AuthService } from '$shared/auth/auth.service';
import Like from '$database/entities/Like';
export declare class LikeService {
    private readonly connection;
    private readonly authService;
    private readonly likeRepository;
    constructor(connection: Connection, authService: AuthService, likeRepository: Repository<Like>);
    likeProduct(memberId: number, productCode: number): Promise<{
        success: boolean;
    }>;
    getNumberOfLikes(productCode: number): Promise<any>;
}
