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
let Image = class Image {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], Image.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_code', type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], Image.prototype, "productCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 1000, nullable: false }),
    __metadata("design:type", String)
], Image.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'int',
        unsigned: true,
        comment: '0: Inactive, 1: active',
        default: enums_1.CommonStatus.Active,
    }),
    __metadata("design:type", Number)
], Image.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Object)
], Image.prototype, "createdAt", void 0);
Image = __decorate([
    (0, typeorm_1.Entity)({ name: 'images' })
], Image);
exports.default = Image;
//# sourceMappingURL=Image.js.map