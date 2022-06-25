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
exports.OrderCartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const Product_1 = require("../../../database/entities/Product");
const typeorm_2 = require("@nestjs/typeorm");
const auth_service_1 = require("../../shared/auth/auth.service");
const exception_1 = require("../../../helpers/exception");
const enums_1 = require("../../../types/enums");
const OrderCart_1 = require("../../../database/entities/OrderCart");
const UserShop_1 = require("../../../database/entities/UserShop");
const User_1 = require("../../../database/entities/User");
let OrderCartService = class OrderCartService {
    constructor(connection, authService, productRepository, orderCartRepository, userShopRepository) {
        this.connection = connection;
        this.authService = authService;
        this.productRepository = productRepository;
        this.orderCartRepository = orderCartRepository;
        this.userShopRepository = userShopRepository;
    }
    async addProductsToCart(memberId, product) {
        const productInDb = await this.productRepository.findOne({
            where: {
                id: product.productCode,
                status: enums_1.ProductStatus.Active || enums_1.ProductStatus.SoldOff,
            },
        });
        if (!!!productInDb) {
            throw new exception_1.Exception(enums_1.ErrorCode.Product_Not_Found, 'Product is deleted! Please try another one!');
        }
        if (productInDb.status == enums_1.ProductStatus.SoldOff) {
            throw new exception_1.Exception(enums_1.ErrorCode.Product_Not_Found, 'Product is sold off! Please try another!');
        }
        if (productInDb.quantityInStock < product.quantityOrder) {
            throw new exception_1.Exception(enums_1.ErrorCode.Quantity_Invalid, 'Quantity you want is invalid!');
        }
        const addingProduct = Object.assign({ customerId: memberId }, product);
        const productInCart = await this.orderCartRepository.findOne({
            where: {
                customerId: memberId,
                productCode: product.productCode,
                status: enums_1.CommonStatus.Active,
            },
        });
        if (!!productInCart) {
            productInCart.quantityOrder += product.quantityOrder;
            return this.orderCartRepository.save(productInCart);
        }
        return this.orderCartRepository.save(addingProduct);
    }
    async deleteProductFromCart(memberId, orderId) {
        const orderInCart = await this.orderCartRepository
            .createQueryBuilder('oc')
            .andWhere('oc.customerId = :memberId AND oc.id = :orderId', {
            memberId: memberId,
            orderId: orderId,
        })
            .getOne();
        if (!orderInCart) {
            throw new exception_1.Exception(enums_1.ErrorCode.Not_Found, 'This order not found!');
        }
        if (orderInCart.customerId !== memberId) {
            throw new exception_1.Exception(enums_1.ErrorCode.Unauthorized, 'You are not author of this order!');
        }
        return await this.orderCartRepository.save(Object.assign(Object.assign({}, orderInCart), { status: enums_1.CommonStatus.Inactive }));
    }
    async getAllOrderInCart(memberId, params) {
        const results = await this.productRepository
            .createQueryBuilder('p')
            .innerJoinAndMapOne('p.userShop', UserShop_1.default, 'us', 'us.id = p.sellerId')
            .innerJoinAndMapOne('us.user', User_1.default, 'u', 'u.id = us.owner_id')
            .innerJoinAndMapOne('p.orderCart', OrderCart_1.default, 'oc', 'oc.productCode = p.id AND oc.customerId = :ocCustomerId AND oc.status = :ocStatus', {
            ocCustomerId: memberId,
            ocStatus: enums_1.CommonStatus.Active,
        })
            .select([
            'us.id',
            'us.shopName',
            'u.id',
            'u.image',
            'u.username',
            'p.id',
            'p.productName',
            'p.priceEach',
            'p.discount',
            'p.image',
            'oc.orderId',
            'oc.quantityOrder',
        ])
            .getMany();
        return results;
    }
    async changeQuantityOrderOfProductInCart(memberId, productCode, quantity) {
        const productInDb = await this.productRepository.findOne(productCode);
        if (quantity > productInDb.quantityInStock) {
            throw new exception_1.Exception(enums_1.ErrorCode.Quantity_Invalid, 'Your quantity is higher than shop has!');
        }
        const productInCartInDb = await this.orderCartRepository
            .createQueryBuilder('oc')
            .innerJoinAndSelect('oc.product', 'product')
            .where('oc.customer_id = :memberId AND oc.status = :status AND oc.productCode = :productCode', {
            memberId: memberId,
            productCode: productCode,
            status: enums_1.ProductStatus.Active,
        })
            .getOne();
        if (!!!productInCartInDb) {
            throw new exception_1.Exception(enums_1.ErrorCode.Product_Not_Found, 'Product is not found or sold off!');
        }
        if (productInCartInDb.product.quantityInStock < quantity) {
            throw new exception_1.Exception(enums_1.ErrorCode.Quantity_Invalid, 'Quantity you want is invalid!');
        }
        productInCartInDb.quantityOrder = quantity;
        return this.orderCartRepository.save(productInCartInDb);
    }
};
OrderCartService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(Product_1.default)),
    __param(3, (0, typeorm_2.InjectRepository)(OrderCart_1.default)),
    __param(4, (0, typeorm_2.InjectRepository)(UserShop_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        auth_service_1.AuthService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], OrderCartService);
exports.OrderCartService = OrderCartService;
//# sourceMappingURL=order-cart.service.js.map