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
exports.OrderController = void 0;
const user_decorator_1 = require("../../../core/decorators/user.decorator");
const utils_1 = require("../../../helpers/utils");
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    orderInShop(member) {
        return this.orderService.orderInShop(member.id);
    }
    getOrders(member, query) {
        (0, utils_1.assignLoadMore)(query);
        return this.orderService.getOrders(member.id, query);
    }
    orderProducts(member, body) {
        return this.orderService.orderProduct(member.id, body);
    }
    updateOrderStatusByOwner(member, body) {
        return this.orderService.updateStatusOrder(member.id, body.status, body.orderId);
    }
    updateOrderStatusByUser(member, body) {
        return this.orderService.updateStatusOrderByUser(member.id, body.status, body.orderId);
    }
};
__decorate([
    (0, common_1.Get)('order-in-shop'),
    __param(0, (0, user_decorator_1.UserData)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "orderInShop", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.UserData)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.UserData)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "orderProducts", null);
__decorate([
    (0, common_1.Put)('update-order-status-owner'),
    __param(0, (0, user_decorator_1.UserData)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updateOrderStatusByOwner", null);
__decorate([
    (0, common_1.Put)('delete-order-user'),
    __param(0, (0, user_decorator_1.UserData)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updateOrderStatusByUser", null);
OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map