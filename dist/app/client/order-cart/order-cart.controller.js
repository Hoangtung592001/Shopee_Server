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
exports.OrderCartController = void 0;
const common_1 = require("@nestjs/common");
const order_cart_service_1 = require("./order-cart.service");
const user_decorator_1 = require("../../../core/decorators/user.decorator");
const utils_1 = require("../../../helpers/utils");
let OrderCartController = class OrderCartController {
    constructor(orderCartService) {
        this.orderCartService = orderCartService;
    }
    addProductsToCart(member, body) {
        return this.orderCartService.addProductsToCart(member.id, body);
    }
    deleteFromCart(member, orderId) {
        return this.orderCartService.deleteProductFromCart(member.id, +orderId);
    }
    getAllInCart(member, query) {
        (0, utils_1.assignLoadMore)(query);
        return this.orderCartService.getAllOrderInCart(member.id, query);
    }
    changeQuantityProducts(member, body) {
        return this.orderCartService.changeQuantityOrderOfProductInCart(member.id, body.productCode, body.quantity);
    }
};
__decorate([
    (0, common_1.Post)('add-products-to-cart'),
    __param(0, (0, user_decorator_1.UserData)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrderCartController.prototype, "addProductsToCart", null);
__decorate([
    (0, common_1.Delete)('delete-from-cart/:id'),
    __param(0, (0, user_decorator_1.UserData)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], OrderCartController.prototype, "deleteFromCart", null);
__decorate([
    (0, common_1.Get)('get-all-products-in-cart'),
    __param(0, (0, user_decorator_1.UserData)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrderCartController.prototype, "getAllInCart", null);
__decorate([
    (0, common_1.Put)('change-quantity-products'),
    __param(0, (0, user_decorator_1.UserData)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrderCartController.prototype, "changeQuantityProducts", null);
OrderCartController = __decorate([
    (0, common_1.Controller)('order-cart'),
    __metadata("design:paramtypes", [order_cart_service_1.OrderCartService])
], OrderCartController);
exports.OrderCartController = OrderCartController;
//# sourceMappingURL=order-cart.controller.js.map