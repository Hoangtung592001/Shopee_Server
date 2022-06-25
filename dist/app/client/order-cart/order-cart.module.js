"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCartModule = void 0;
const common_1 = require("@nestjs/common");
const order_cart_service_1 = require("./order-cart.service");
const order_cart_controller_1 = require("./order-cart.controller");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../../shared/auth/auth.module");
const Product_1 = require("../../../database/entities/Product");
const OrderCart_1 = require("../../../database/entities/OrderCart");
const User_1 = require("../../../database/entities/User");
const UserShop_1 = require("../../../database/entities/UserShop");
let OrderCartModule = class OrderCartModule {
};
OrderCartModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Product_1.default, OrderCart_1.default, User_1.default, UserShop_1.default]),
            auth_module_1.AuthModule,
        ],
        controllers: [order_cart_controller_1.OrderCartController],
        providers: [order_cart_service_1.OrderCartService],
    })
], OrderCartModule);
exports.OrderCartModule = OrderCartModule;
//# sourceMappingURL=order-cart.module.js.map