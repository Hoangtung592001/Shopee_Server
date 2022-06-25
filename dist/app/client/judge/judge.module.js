"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JudgeModule = void 0;
const common_1 = require("@nestjs/common");
const judge_service_1 = require("./judge.service");
const judge_controller_1 = require("./judge.controller");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../../shared/auth/auth.module");
const Judge_1 = require("../../../database/entities/Judge");
const Product_1 = require("../../../database/entities/Product");
let JudgeModule = class JudgeModule {
};
JudgeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Judge_1.default, Product_1.default]), auth_module_1.AuthModule],
        controllers: [judge_controller_1.JudgeController],
        providers: [judge_service_1.JudgeService],
    })
], JudgeModule);
exports.JudgeModule = JudgeModule;
//# sourceMappingURL=judge.module.js.map