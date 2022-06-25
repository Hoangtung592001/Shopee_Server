import RoleUser from '$database/entities/UserRole';
import UserShop from './UserShop';
import { GenderStatus } from '$types/enums';
import Judge from './Judge';
export default class User {
    id: number;
    email: string;
    password: string;
    username: string;
    image: string;
    phone: string;
    gender: GenderStatus;
    status: number;
    dateOfBirth: string;
    refreshToken: string;
    createdAt: string | Date;
    roleId: number;
    shop: UserShop;
    role: RoleUser;
    judges: Judge[];
}
