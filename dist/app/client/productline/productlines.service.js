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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductLineService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const ProductLine_1 = require("../../../database/entities/ProductLine");
const typeorm_2 = require("@nestjs/typeorm");
const auth_service_1 = require("../../shared/auth/auth.service");
let ProductLineService = class ProductLineService {
    constructor(connection, authService, productLineRepository) {
        this.connection = connection;
        this.authService = authService;
        this.productLineRepository = productLineRepository;
    }
    async getAllProductLines() {
        return (await this.productLineRepository.find());
    }
};
ProductLineService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(ProductLine_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        auth_service_1.AuthService,
        typeorm_1.Repository])
], ProductLineService);
exports.ProductLineService = ProductLineService;
//# sourceMappingURL=productlines.service.js.map