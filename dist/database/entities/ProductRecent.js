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
let ProductRecent = class ProductRecent {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id", type: "bigint", unsigned: true }),
    __metadata("design:type", Number)
], ProductRecent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "visitor_id", type: "bigint", unsigned: true }),
    __metadata("design:type", Number)
], ProductRecent.prototype, "visitorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_code", type: "bigint", unsigned: true }),
    __metadata("design:type", Number)
], ProductRecent.prototype, "productCode", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'visited_at', type: 'datetime' }),
    __metadata("design:type", String)
], ProductRecent.prototype, "visitedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'visitor_id', referencedColumnName: 'id' }),
    __metadata("design:type", User_1.default)
], ProductRecent.prototype, "visitor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'product_code', referencedColumnName: 'id' }),
    __metadata("design:type", Product_1.default)
], ProductRecent.prototype, "product", void 0);
ProductRecent = __decorate([
    (0, typeorm_1.Entity)({ name: 'product_recent' })
], ProductRecent);
exports.default = ProductRecent;
//# sourceMappingURL=ProductRecent.js.map