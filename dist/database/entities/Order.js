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
const OrderDetail_1 = require("./OrderDetail");
const Voucher_1 = require("./Voucher");
let Order = class Order {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'ordered_at', type: 'datetime', nullable: false }),
    __metadata("design:type", Object)
], Order.prototype, "orderedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'deleted_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'delivered_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "deliveredAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'shipped_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "shippedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'tinyint',
        nullable: false,
        default: enums_1.OrderStatus.Preparing,
        comment: '0: deleted 1: Preparing, 2: Delivering, 3: Shipped',
    }),
    __metadata("design:type", Number)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address', type: 'varchar', length: 1000, nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'receiver_name',
        type: 'varchar',
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], Order.prototype, "receiverName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone', type: 'varchar', length: 20, nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'customer_id',
        type: 'bigint',
        unsigned: true,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Order.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'voucher_id',
        type: 'bigint',
        unsigned: true,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Order.prototype, "voucherId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'shipping_fee',
        type: 'double',
        unsigned: true,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Order.prototype, "shippingFee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Voucher_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'voucher_id', referencedColumnName: 'id' }),
    __metadata("design:type", Voucher_1.default)
], Order.prototype, "voucher", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderDetail_1.default, (orderdetail) => orderdetail.order),
    __metadata("design:type", Array)
], Order.prototype, "orderdetails", void 0);
Order = __decorate([
    (0, typeorm_1.Entity)({ name: 'order' })
], Order);
exports.default = Order;
//# sourceMappingURL=Order.js.map