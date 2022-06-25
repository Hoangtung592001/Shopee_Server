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
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../types/enums");
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
let OrderCart = class OrderCart {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], OrderCart.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'product_code',
        type: 'bigint',
        nullable: false,
        unsigned: true,
    }),
    __metadata("design:type", Number)
], OrderCart.prototype, "productCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'quantity_order',
        type: 'int',
        unsigned: true,
        nullable: false,
    }),
    __metadata("design:type", Number)
], OrderCart.prototype, "quantityOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'customer_id',
        type: 'bigint',
        unsigned: true,
        nullable: false,
    }),
    __metadata("design:type", Number)
], OrderCart.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'tinyint',
        unsigned: true,
        default: enums_1.CommonStatus.Active,
        comment: '1: active 0: deleted',
    }),
    __metadata("design:type", Number)
], OrderCart.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Object)
], OrderCart.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'deleted_at', type: 'datetime' }),
    __metadata("design:type", Object)
], OrderCart.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'product_code', referencedColumnName: 'id' }),
    __metadata("design:type", Product_1.default)
], OrderCart.prototype, "product", void 0);
OrderCart = __decorate([
    (0, typeorm_1.Entity)({ name: 'orders_cart' })
], OrderCart);
exports.default = OrderCart;
//# sourceMappingURL=OrderCart.js.map