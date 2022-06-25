import { MemberService } from './member.service';
import { IUserReq } from '$types/interfaces';
import { RegisterShopDto } from './dto/RegisterShopDto.dto';
import { EditPhoneDto } from './dto/EditPhone.dto';
export declare class MemberController {
    private readonly memberService;
    constructor(memberService: MemberService);
    getPersonalInfo(req: IUserReq): Promise<import("../../../database/entities/User").default>;
    registerShop(body: RegisterShopDto, member: Express.User): Promise<any>;
    editPhone(body: EditPhoneDto, member: Express.User): Promise<import("typeorm").UpdateResult>;
}
