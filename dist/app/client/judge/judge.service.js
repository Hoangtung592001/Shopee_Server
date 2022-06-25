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
exports.JudgeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const auth_service_1 = require("../../shared/auth/auth.service");
const typeorm_2 = require("@nestjs/typeorm");
const Judge_1 = require("../../../database/entities/Judge");
const Product_1 = require("../../../database/entities/Product");
const exception_1 = require("../../../helpers/exception");
const enums_1 = require("../../../types/enums");
const User_1 = require("../../../database/entities/User");
let JudgeService = class JudgeService {
    constructor(connection, authService, judgeRepository, productRepository) {
        this.connection = connection;
        this.authService = authService;
        this.judgeRepository = judgeRepository;
        this.productRepository = productRepository;
    }
    async postJudge(memberId, judge) {
        const productInDb = await this.productRepository.findOne(judge.productCode);
        if (!!!productInDb || productInDb.status == enums_1.ProductStatus.Deleted) {
            throw new exception_1.Exception(enums_1.ErrorCode.Not_Found, 'This product is deleted!');
        }
        return this.judgeRepository.save({
            memberId: memberId,
            productCode: judge.productCode,
            content: judge.content,
            stars: judge.stars,
        });
    }
    async deleteJudge(memberId, judgeId) {
        const judge = await this.judgeRepository
            .createQueryBuilder('j')
            .where('j.member_id = :memberId AND j.id = :judgeId', {
            memberId: memberId,
            judgeId: judgeId,
        })
            .getOne();
        if (!!!judge) {
            throw new exception_1.Exception(enums_1.ErrorCode.Delete_Judge_Invalid, 'You are not owner of this judge! Or There is no judge you want to delete!');
        }
        await this.judgeRepository.delete(judge.id);
        return {
            success: true,
        };
    }
    async getAllJudgesOfProduct(productCode) {
        return this.judgeRepository
            .createQueryBuilder('j')
            .where('j.productCode = :productCode AND status = 1', {
            productCode: productCode,
        })
            .getMany();
    }
    async getJudge(memberId, params) {
        const queryBuilder = this.judgeRepository
            .createQueryBuilder('j')
            .innerJoinAndMapOne('j.product', Product_1.default, 'p', 'p.id = j.productCode AND p.status = :pStatus', { pStatus: enums_1.ProductStatus.Active })
            .innerJoinAndMapOne('j.member', User_1.default, 'u', 'u.id = j.memberId AND u.status = :uStatus', { uStatus: enums_1.CommonStatus.Active })
            .select([
            'j.id',
            'j.content',
            'j.stars',
            'j.createdAt',
            'u.id',
            'u.email',
            'u.username',
            'u.image',
            'p.id',
            'p.productName',
            'p.image',
        ])
            .where('u.id = :memberId AND j.status = :jStatus', {
            memberId: memberId,
            jStatus: enums_1.CommonStatus.Active,
        });
        const results = await queryBuilder.orderBy('j.id', 'DESC').getMany();
        return results;
    }
};
JudgeService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(Judge_1.default)),
    __param(3, (0, typeorm_2.InjectRepository)(Product_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        auth_service_1.AuthService,
        typeorm_1.Repository,
        typeorm_1.Repository])
], JudgeService);
exports.JudgeService = JudgeService;
//# sourceMappingURL=judge.service.js.map