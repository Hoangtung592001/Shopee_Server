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
const typeorm_1 = require("typeorm");
const UserRole_1 = require("./UserRole");
const UserShop_1 = require("./UserShop");
const enums_1 = require("../../types/enums");
const Judge_1 = require("./Judge");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'email',
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'username', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image', type: 'varchar', length: 10000, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gender', type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'tinyint',
        comment: '1: active, 0: inactive',
        default: enums_1.CommonStatus.Active,
    }),
    __metadata("design:type", Number)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date_of_birth', type: 'date', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'refresh_token',
        type: 'varchar',
        length: 1000,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Object)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role_id', type: 'bigint', unsigned: true, default: 1 }),
    __metadata("design:type", Number)
], User.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UserShop_1.default),
    __metadata("design:type", UserShop_1.default)
], User.prototype, "shop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserRole_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'role_id', referencedColumnName: 'id' }),
    __metadata("design:type", UserRole_1.default)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Judge_1.default, (judge) => judge.user),
    __metadata("design:type", Array)
], User.prototype, "judges", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: 'user' })
], User);
exports.default = User;
//# sourceMappingURL=User.js.map