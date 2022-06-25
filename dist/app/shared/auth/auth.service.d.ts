import { JwtService } from '@nestjs/jwt';
import { IPrePayload, ITokenPayload } from '$types/interfaces';
import { Repository } from 'typeorm';
import User from '$database/entities/User';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateAccessToken(input: IPrePayload): string;
    generateRefreshToken(input: IPrePayload): string;
    verifyRefreshToken(refreshToken: string, userRepository: Repository<User>): Promise<false | ITokenPayload>;
    unPackageRefreshOrAccessToken(token: string): Promise<false | ITokenPayload>;
}
