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
const Judge_1 = require("./Judge");
const Like_1 = require("./Like");
const UserShop_1 = require("./UserShop");
let Product = class Product {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'product_name',
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_line', type: 'int' }),
    __metadata("design:type", Number)
], Product.prototype, "productLine", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'quantity_in_stock',
        type: 'bigint',
        unsigned: true,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Product.prototype, "quantityInStock", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'price_each',
        type: 'double',
        unsigned: true,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Product.prototype, "priceEach", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image', type: 'varchar', length: 5000, nullable: false }),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
        length: 5000,
        nullable: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'origin', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Product.prototype, "origin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount', type: 'double', default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'tinyint',
        comment: '0: Deleted, 1: Active, 2: SoldOff',
        default: enums_1.ProductStatus.Active,
    }),
    __metadata("design:type", Number)
], Product.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'sold_quantity',
        type: 'bigint',
        unsigned: true,
        nullable: false,
        default: 0,
    }),
    __metadata("design:type", Number)
], Product.prototype, "soldQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'seller_id', type: 'int', unsigned: true, nullable: false }),
    __metadata("design:type", Number)
], Product.prototype, "sellerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shop_type_id', type: 'int', unsigned: true, default: 1 }),
    __metadata("design:type", Number)
], Product.prototype, "shopTypeId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Like_1.default, (like) => like.product),
    __metadata("design:type", Array)
], Product.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Judge_1.default, (judge) => judge.product),
    __metadata("design:type", Array)
], Product.prototype, "judges", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserShop_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'seller_id', referencedColumnName: 'id' }),
    __metadata("design:type", UserShop_1.default)
], Product.prototype, "seller", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)({ name: 'product' })
], Product);
exports.default = Product;
//# sourceMappingURL=Product.js.map