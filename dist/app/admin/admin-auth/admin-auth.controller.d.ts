import { AdminAuthService } from './admin-auth.service';
import { IUser, IUserLogin, IUserReq, IPrePayload } from '$types/interfaces';
import { Request } from 'express';
export declare class AdminAuthController {
    private readonly adminAuthService;
    constructor(adminAuthService: AdminAuthService);
    signUp(body: IUser): Promise<IUser>;
    signIn(body: IUserLogin): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    changePassword(req: IUserReq): Promise<IPrePayload>;
    refreshAccessToken(req: Request): Promise<string>;
    adminGetAllUsers(): Promise<import("../../../database/entities/User").default[]>;
}
