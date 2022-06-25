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
const Product_1 = require("./Product");
const User_1 = require("./User");
const enums_1 = require("../../types/enums");
const UserShopType_1 = require("./UserShopType");
let UserShop = class UserShop {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], UserShop.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'shop_name',
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], UserShop.prototype, "shopName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], UserShop.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coverPhoto', type: 'varchar', length: 1000 }),
    __metadata("design:type", String)
], UserShop.prototype, "coverPhoto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'profilePicture', type: 'varchar', length: 1000 }),
    __metadata("design:type", String)
], UserShop.prototype, "profilePicture", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'shop_type_id',
        type: 'int',
        unsigned: true,
        comment: '0: Normal 1: Mall',
        default: enums_1.ShopType.Normal,
    }),
    __metadata("design:type", Number)
], UserShop.prototype, "shopTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'owner_id', type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], UserShop.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'tinyint',
        comment: '1: active, 0: Inactive',
        default: enums_1.CommonStatus.Active,
    }),
    __metadata("design:type", Number)
], UserShop.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'registered_at', type: 'datetime' }),
    __metadata("design:type", String)
], UserShop.prototype, "registeredAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Product_1.default, (product) => product.seller),
    __metadata("design:type", Array)
], UserShop.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserShopType_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'shop_type_id', referencedColumnName: 'id' }),
    __metadata("design:type", UserShopType_1.default)
], UserShop.prototype, "shopType", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'owner_id', referencedColumnName: 'id' }),
    __metadata("design:type", User_1.default)
], UserShop.prototype, "owner", void 0);
UserShop = __decorate([
    (0, typeorm_1.Entity)({ name: 'user_shop' })
], UserShop);
exports.default = UserShop;
//# sourceMappingURL=UserShop.js.map