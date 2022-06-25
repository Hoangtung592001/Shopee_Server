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
const User_1 = require("./User");
let Judge = class Judge {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], Judge.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'member_id',
        type: 'bigint',
        unsigned: true,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Judge.prototype, "memberId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_code', type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], Judge.prototype, "productCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'content', type: 'varchar', length: 5000 }),
    __metadata("design:type", String)
], Judge.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stars', type: 'tinyint', unsigned: true }),
    __metadata("design:type", Number)
], Judge.prototype, "stars", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'int',
        unsigned: true,
        comment: '0: Inactive, 1: active',
        default: enums_1.CommonStatus.Active,
    }),
    __metadata("design:type", Number)
], Judge.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Object)
], Judge.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'updated_at', type: 'datetime' }),
    __metadata("design:type", Object)
], Judge.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'product_code', referencedColumnName: 'id' }),
    __metadata("design:type", Product_1.default)
], Judge.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'member_id', referencedColumnName: 'id' }),
    __metadata("design:type", User_1.default)
], Judge.prototype, "user", void 0);
Judge = __decorate([
    (0, typeorm_1.Entity)({ name: 'judge' })
], Judge);
exports.default = Judge;
//# sourceMappingURL=Judge.js.map