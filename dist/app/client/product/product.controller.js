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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = exports.storage = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const public_decorator_1 = require("../../../core/decorators/public.decorator");
const roles_decorator_1 = require("../../../core/decorators/roles.decorator");
const enums_1 = require("../../../types/enums");
const user_decorator_1 = require("../../../core/decorators/user.decorator");
const utils_1 = require("../../../helpers/utils");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path = require("path");
const uuid_1 = require("uuid");
exports.storage = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/blog-entry-images',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + (0, uuid_1.v4)();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        },
    }),
};
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async uploadProductImage(file) {
        return this.productService.uploadProductImage(file);
    }
    async getAllProducts(req, query) {
        (0, utils_1.assignLoadMore)(query);
        return this.productService.getAllProducts(query);
    }
    async addProduct(req) {
        const body = req.body;
        const _a = req.user, { tokenType } = _a, user = __rest(_a, ["tokenType"]);
        return await this.productService.addProduct(body, user);
    }
    async getProduct(id) {
        return await this.productService.getProduct(id);
    }
    async getProductByUser(member, id) {
        return await this.productService.getProducByUser(member.id, id);
    }
    async forceDeleteProduct(params, req) {
        const idProduct = params.id;
        const _a = req.user, { tokenType } = _a, user = __rest(_a, ["tokenType"]);
        return this.productService.deleteProduct(idProduct, user);
    }
    async userDeleteProduct(params, req) {
        const idProduct = +params.id;
        const _a = req.user, { tokenType } = _a, user = __rest(_a, ["tokenType"]);
        return this.productService.deleteProduct(idProduct, user);
    }
    async changeInfoProduct(body, params, member) {
        const productId = +params.id;
        const productInfo = body;
        return this.productService.changeInfoProduct(productId, productInfo, member.id);
    }
    recentVisited(member, id) {
        return this.productService.recentVisited(member.id, +id);
    }
    getAllProductsInShop(member) {
        return this.productService.getAllProductsInShop(member.id);
    }
    getAllProductsInShopPublic(memberId) {
        return this.productService.getAllProductsInShop(memberId);
    }
    getRecentVisitedProduct(member, query) {
        (0, utils_1.assignLoadMore)(query);
        return this.productService.getRecentVisitedProduct(member.id, query);
    }
    getLikedProducts(member) {
        return this.productService.getLikedProducts(member.id);
    }
    getInfoOrder(member) {
        return this.productService.getInfoOrder(member.id);
    }
    listSearchProducts(query) {
        return this.productService.listSearchProducts(query.keywords);
    }
    searchProducts(query) {
        return this.productService.searchProducts(query.keywords);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('upload-image-product'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', exports.storage)),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "uploadProductImage", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('get-all-products'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Post)('add-products'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addProduct", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('get-product/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Get)('get-product-by-user/:id'),
    __param(0, (0, user_decorator_1.UserData)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductByUser", null);
__decorate([
    (0, roles_decorator_1.Roles)(enums_1.Role.Admin),
    (0, common_1.Delete)('force-delete-product/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "forceDeleteProduct", null);
__decorate([
    (0, common_1.Delete)('user-delete-product/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "userDeleteProduct", null);
__decorate([
    (0, common_1.Patch)('change-product-info/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, user_decorator_1.UserData)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "changeInfoProduct", null);
__decorate([
    (0, common_1.Post)('recent-visited/:id'),
    __param(0, (0, user_decorator_1.UserData)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "recentVisited", null);
__decorate([
    (0, common_1.Get)('get-all-products-in-shop'),
    __param(0, (0, user_decorator_1.UserData)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getAllProductsInShop", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('get-all-products-in-shop-public/:memberId'),
    __param(0, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getAllProductsInShopPublic", null);
__decorate([
    (0, common_1.Get)('get-recent-visited'),
    __param(0, (0, user_decorator_1.UserData)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getRecentVisitedProduct", null);
__decorate([
    (0, common_1.Get)('get-liked-products'),
    __param(0, (0, user_decorator_1.UserData)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getLikedProducts", null);
__decorate([
    (0, common_1.Get)('get-info-order'),
    __param(0, (0, user_decorator_1.UserData)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getInfoOrder", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('list-search-products'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "listSearchProducts", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('search-products'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "searchProducts", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map