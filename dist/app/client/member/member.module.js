"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberModule = void 0;
const common_1 = require("@nestjs/common");
const member_service_1 = require("./member.service");
const member_controller_1 = require("./member.controller");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../../../database/entities/User");
const auth_module_1 = require("../../shared/auth/auth.module");
const UserShop_1 = require("../../../database/entities/UserShop");
const UserShopType_1 = require("../../../database/entities/UserShopType");
const Order_1 = require("../../../database/entities/Order");
const OrderCart_1 = require("../../../database/entities/OrderCart");
const Product_1 = require("../../../database/entities/Product");
const Like_1 = require("../../../database/entities/Like");
let MemberModule = class MemberModule {
};
MemberModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                User_1.default,
                UserShop_1.default,
                UserShopType_1.default,
                Product_1.default,
                Order_1.default,
                OrderCart_1.default,
                Like_1.default,
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [member_controller_1.MemberController],
        providers: [member_service_1.MemberService],
    })
], MemberModule);
exports.MemberModule = MemberModule;
//# sourceMappingURL=member.module.js.map