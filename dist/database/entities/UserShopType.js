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
const UserShop_1 = require("./UserShop");
let UserShopType = class UserShopType {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], UserShopType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shop_name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], UserShopType.prototype, "shopName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserShop_1.default, (userShop) => userShop.shopType),
    __metadata("design:type", Array)
], UserShopType.prototype, "shops", void 0);
UserShopType = __decorate([
    (0, typeorm_1.Entity)({ name: 'user_shop_type' })
], UserShopType);
exports.default = UserShopType;
//# sourceMappingURL=UserShopType.js.map