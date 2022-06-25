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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const auth_service_1 = require("../../shared/auth/auth.service");
const typeorm_2 = require("@nestjs/typeorm");
const Like_1 = require("../../../database/entities/Like");
let LikeService = class LikeService {
    constructor(connection, authService, likeRepository) {
        this.connection = connection;
        this.authService = authService;
        this.likeRepository = likeRepository;
    }
    async likeProduct(memberId, productCode) {
        const isLiked = await this.likeRepository
            .createQueryBuilder('l')
            .where('l.member_id = :memberId AND l.product_code = :productCode', {
            memberId: memberId,
            productCode: productCode,
        })
            .orderBy('l.created_at', 'DESC')
            .limit(1)
            .getOne();
        if (!!!isLiked || isLiked.status == 0) {
            await this.likeRepository.save({
                memberId: memberId,
                productCode: productCode,
            });
        }
        else {
            isLiked.status = 0;
            await this.likeRepository.save(isLiked);
        }
        return {
            success: true,
        };
    }
    async getNumberOfLikes(productCode) {
        const queryBuilder = await this.likeRepository
            .createQueryBuilder('l')
            .select('count(l.id) as amountOfLikes')
            .where('l.product_code = :productCode AND status = 1', {
            productCode: productCode,
        })
            .getRawOne();
        return queryBuilder.amountOfLikes;
    }
};
LikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(Like_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        auth_service_1.AuthService,
        typeorm_1.Repository])
], LikeService);
exports.LikeService = LikeService;
//# sourceMappingURL=like.service.js.map