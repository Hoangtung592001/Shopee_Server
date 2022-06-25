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
exports.ProductLineController = void 0;
const common_1 = require("@nestjs/common");
const productlines_service_1 = require("./productlines.service");
const public_decorator_1 = require("../../../core/decorators/public.decorator");
let ProductLineController = class ProductLineController {
    constructor(productLineService) {
        this.productLineService = productLineService;
    }
    async getAllProductLines() {
        return await this.productLineService.getAllProductLines();
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('get-all-product-lines'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductLineController.prototype, "getAllProductLines", null);
ProductLineController = __decorate([
    (0, common_1.Controller)('product-line'),
    __metadata("design:paramtypes", [productlines_service_1.ProductLineService])
], ProductLineController);
exports.ProductLineController = ProductLineController;
//# sourceMappingURL=productlines.controller.js.map