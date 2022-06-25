import { IUser, IUserLogin, IInputChangePassword, IRefreshTokenPakage, IPrePayload } from '$types/interfaces';
import { Connection, Repository } from 'typeorm';
import User from '$database/entities/User';
import { AuthService } from '$shared/auth/auth.service';
export declare class AdminAuthService {
    private readonly connection;
    private readonly authService;
    private readonly userRepository;
    constructor(connection: Connection, authService: AuthService, userRepository: Repository<User>);
    signUp(user: IUser): Promise<IUser>;
    signIn(user: IUserLogin): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    isEmailExists(email: string, userRepository?: Repository<User>): Promise<boolean>;
    changePassword(info: IInputChangePassword, user: IPrePayload): Promise<IPrePayload>;
    refreshAccessToken(params: IRefreshTokenPakage): Promise<string>;
    getAllUsers(): Promise<User[]>;
}
