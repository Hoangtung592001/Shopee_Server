"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeModule = void 0;
const common_1 = require("@nestjs/common");
const like_service_1 = require("./like.service");
const like_controller_1 = require("./like.controller");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../../shared/auth/auth.module");
const Like_1 = require("../../../database/entities/Like");
let LikeModule = class LikeModule {
};
LikeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Like_1.default]), auth_module_1.AuthModule],
        controllers: [like_controller_1.LikeController],
        providers: [like_service_1.LikeService],
    })
], LikeModule);
exports.LikeModule = LikeModule;
//# sourceMappingURL=like.module.js.map