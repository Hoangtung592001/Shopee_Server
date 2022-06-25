import { IPrePayload } from '$types/interfaces';
import { Connection, Repository } from 'typeorm';
import User from '$database/entities/User';
import { RegisterShopDto } from './dto/RegisterShopDto.dto';
import UserShop from '$database/entities/UserShop';
import { EditPhoneDto } from './dto/EditPhone.dto';
export declare class MemberService {
    private readonly connection;
    private readonly userRepository;
    private readonly userShopRepository;
    constructor(connection: Connection, userRepository: Repository<User>, userShopRepository: Repository<UserShop>);
    getPersonalInfo(user: IPrePayload): Promise<User>;
    registerShop(memberId: number, info: RegisterShopDto): Promise<any>;
    editPhone(memberId: number, body: EditPhoneDto): Promise<import("typeorm").UpdateResult>;
}
