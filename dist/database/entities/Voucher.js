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
const Order_1 = require("./Order");
let Like = class Like {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], Like.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'member_id', type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], Like.prototype, "memberId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'value', type: 'double', unsigned: true }),
    __metadata("design:type", Number)
], Like.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'tinyint',
        unsigned: true,
        comment: '0: Inactive 1: Active',
        default: enums_1.CommonStatus.Active,
    }),
    __metadata("design:type", Number)
], Like.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'used_at', type: 'datetime' }),
    __metadata("design:type", Object)
], Like.prototype, "usedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'started_at', type: 'datetime' }),
    __metadata("design:type", Object)
], Like.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'expired_at', type: 'datetime' }),
    __metadata("design:type", Object)
], Like.prototype, "expiredAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Object)
], Like.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order_1.default, (order) => order.voucher),
    __metadata("design:type", Array)
], Like.prototype, "order", void 0);
Like = __decorate([
    (0, typeorm_1.Entity)({ name: 'voucher' })
], Like);
exports.default = Like;
//# sourceMappingURL=Voucher.js.map