"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_controller_1 = require("./product.controller");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../../shared/auth/auth.module");
const Product_1 = require("../../../database/entities/Product");
const OrderCart_1 = require("../../../database/entities/OrderCart");
const User_1 = require("../../../database/entities/User");
const UserShop_1 = require("../../../database/entities/UserShop");
const ProductRecent_1 = require("../../../database/entities/ProductRecent");
const Judge_1 = require("../../../database/entities/Judge");
const Like_1 = require("../../../database/entities/Like");
const Image_1 = require("../../../database/entities/Image");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                Product_1.default,
                OrderCart_1.default,
                User_1.default,
                UserShop_1.default,
                ProductRecent_1.default,
                Judge_1.default,
                Like_1.default,
                Image_1.default,
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map