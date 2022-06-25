"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../shared/auth/auth.module");
const product_module_1 = require("./product/product.module");
const productlines_module_1 = require("./productline/productlines.module");
const notification_module_1 = require("./notification/notification.module");
const client_auth_module_1 = require("./client-auth/client-auth.module");
const member_module_1 = require("./member/member.module");
const voucher_module_1 = require("./voucher/voucher.module");
const like_module_1 = require("./like/like.module");
const judge_module_1 = require("./judge/judge.module");
const order_cart_module_1 = require("./order-cart/order-cart.module");
const order_module_1 = require("./order/order.module");
let ClientModule = class ClientModule {
};
ClientModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            product_module_1.ProductModule,
            productlines_module_1.ProductLineModule,
            notification_module_1.NotificationModule,
            member_module_1.MemberModule,
            client_auth_module_1.ClientAuthModule,
            voucher_module_1.VoucherModule,
            like_module_1.LikeModule,
            judge_module_1.JudgeModule,
            order_cart_module_1.OrderCartModule,
            order_module_1.OrderModule,
        ],
        controllers: [],
        providers: [],
        exports: [],
    })
], ClientModule);
exports.ClientModule = ClientModule;
//# sourceMappingURL=client.module.js.map