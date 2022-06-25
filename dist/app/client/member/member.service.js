"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const User_1 = require("../../../database/entities/User");
const typeorm_2 = require("@nestjs/typeorm");
const exception_1 = require("../../../helpers/exception");
const enums_1 = require("../../../types/enums");
const UserShop_1 = require("../../../database/entities/UserShop");
let MemberService = class MemberService {
    constructor(connection, userRepository, userShopRepository) {
        this.connection = connection;
        this.userRepository = userRepository;
        this.userShopRepository = userShopRepository;
    }
    async getPersonalInfo(user) {
        const hasEmail = await this.userRepository
            .createQueryBuilder('u')
            .leftJoinAndMapOne('u.shop', UserShop_1.default, 'us', 'us.ownerId = u.id AND us.status = :usStatus', { usStatus: enums_1.CommonStatus.Active })
            .select([
            'u.id',
            'u.email',
            'u.username',
            'u.image',
            'u.phone',
            'u.gender',
            'u.dateOfBirth',
            'us.id',
            'us.shopName',
            'us.address',
            'us.profilePicture',
            'us.coverPhoto',
            'us.shopTypeId',
        ])
            .where('u.id = :memberId', { memberId: user.id })
            .getOne();
        return hasEmail;
    }
    async registerShop(memberId, info) {
        const userHaveShop = await this.userShopRepository.findOne({
            where: { ownerId: memberId },
        });
        if (!!userHaveShop) {
            throw new exception_1.Exception(enums_1.ErrorCode.Already_Register_Shop, 'You have registered shop!');
        }
        const savingInfo = info;
        savingInfo.ownerId = memberId;
        return this.userShopRepository.save(savingInfo);
    }
    async editPhone(memberId, body) {
        const hasPhone = await this.userRepository.findOne({
            phone: body.phone,
        });
        if (hasPhone) {
            throw new exception_1.Exception(enums_1.ErrorCode.Resource_Already_Exists, 'This phone existed!');
        }
        return this.userRepository.update({
            id: memberId,
        }, { phone: body.phone });
    }
};
MemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(User_1.default)),
    __param(2, (0, typeorm_2.InjectRepository)(UserShop_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        typeorm_1.Repository,
        typeorm_1.Repository])
], MemberService);
exports.MemberService = MemberService;
//# sourceMappingURL=member.service.js.map