import { ClientAuthService } from './client-auth.service';
import { IUser, IUserLogin, IUserReq, IPrePayload } from '$types/interfaces';
import { Request } from 'express';
export declare class ClientAuthController {
    private readonly clientAuthService;
    constructor(clientAuthService: ClientAuthService);
    signUp(body: IUser): Promise<IUser>;
    signIn(body: IUserLogin): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    changePassword(req: IUserReq): Promise<IPrePayload>;
    refreshAccessToken(req: Request): Promise<string>;
}
