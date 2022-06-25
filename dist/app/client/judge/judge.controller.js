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
exports.JudgeController = void 0;
const common_1 = require("@nestjs/common");
const judge_service_1 = require("./judge.service");
const public_decorator_1 = require("../../../core/decorators/public.decorator");
const user_decorator_1 = require("../../../core/decorators/user.decorator");
const utils_1 = require("../../../helpers/utils");
let JudgeController = class JudgeController {
    constructor(judgeService) {
        this.judgeService = judgeService;
    }
    postJudge(member, body) {
        return this.judgeService.postJudge(member.id, body);
    }
    deleteJudge(member, id) {
        return this.judgeService.deleteJudge(member.id, +id);
    }
    getJudge(member, query) {
        (0, utils_1.assignLoadMore)(query);
        return this.judgeService.getJudge(member.id, query);
    }
    getAllJudgesOfProduct(productCode) {
        return this.judgeService.getAllJudgesOfProduct(+productCode);
    }
};
__decorate([
    (0, common_1.Post)('post-judge'),
    __param(0, (0, user_decorator_1.UserData)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], JudgeController.prototype, "postJudge", null);
__decorate([
    (0, common_1.Delete)('delete-judge/:id'),
    __param(0, (0, user_decorator_1.UserData)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], JudgeController.prototype, "deleteJudge", null);
__decorate([
    (0, common_1.Get)('get-judge'),
    __param(0, (0, user_decorator_1.UserData)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], JudgeController.prototype, "getJudge", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JudgeController.prototype, "getAllJudgesOfProduct", null);
JudgeController = __decorate([
    (0, common_1.Controller)('judge'),
    __metadata("design:paramtypes", [judge_service_1.JudgeService])
], JudgeController);
exports.JudgeController = JudgeController;
//# sourceMappingURL=judge.controller.js.map