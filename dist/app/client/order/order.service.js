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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const auth_service_1 = require("../../shared/auth/auth.service");
const Order_1 = require("../../../database/entities/Order");
const OrderDetail_1 = require("../../../database/entities/OrderDetail");
const Product_1 = require("../../../database/entities/Product");
const exception_1 = require("../../../helpers/exception");
const enums_1 = require("../../../types/enums");
const utils_1 = require("../../../helpers/utils");
const Voucher_1 = require("../../../database/entities/Voucher");
const OrderCart_1 = require("../../../database/entities/OrderCart");
const UserShop_1 = require("../../../database/entities/UserShop");
const User_1 = require("../../../database/entities/User");
const utils_2 = require("../../../helpers/utils");
let OrderService = class OrderService {
    constructor(connection, authService, orderRepository, orderdetailRepository, productRepository) {
        this.connection = connection;
        this.authService = authService;
        this.orderRepository = orderRepository;
        this.orderdetailRepository = orderdetailRepository;
        this.productRepository = productRepository;
    }
    async getOrders(memberId, params) {
        const queryBuilder = this.orderRepository
            .createQueryBuilder('o')
            .select('o.id', 'orderId')
            .addSelect('o.status', 'status')
            .addSelect('od.price_each', 'priceEach')
            .addSelect('od.quantity_order', 'quantity')
            .addSelect('p.product_name', 'productName')
            .addSelect('p.id', 'productCode')
            .addSelect('p.image', 'productImage')
            .addSelect('p.status', 'productStatus')
            .addSelect('us.shop_name', 'shopName')
            .addSelect('us.id', 'shopId')
            .addSelect('u.image', 'shopImage')
            .innerJoin(OrderDetail_1.default, 'od', 'o.id = od.order_id')
            .innerJoin(Product_1.default, 'p', 'od.product_code = p.id')
            .innerJoin(UserShop_1.default, 'us', 'us.id = p.seller_id')
            .innerJoin(User_1.default, 'u', 'u.id = us.owner_id')
            .andWhere('o.status != :status AND o.customer_id = :memberId', {
            status: enums_1.OrderStatus.Deleted,
            memberId: memberId,
        });
        if (params.takeAfter) {
            queryBuilder.andWhere('o.id < :takeAfter', {
                takeAfter: params.takeAfter,
            });
        }
        const results = await queryBuilder
            .orderBy('o.id', 'DESC')
            .take(params.pageSize)
            .getRawMany();
        return (0, utils_2.filterOrders)(results);
    }
    async orderProduct(memberId, body) {
        return this.connection.transaction(async (transaction) => {
            const productRepository = transaction.getRepository(Product_1.default);
            const orderRepository = transaction.getRepository(Order_1.default);
            const orderdetailRepository = transaction.getRepository(OrderDetail_1.default);
            const voucherRepository = transaction.getRepository(Voucher_1.default);
            const orderCartRepository = transaction.getRepository(OrderCart_1.default);
            const allShopIds = Object.keys(body.data);
            const allProductCodes = [];
            allShopIds.forEach((shopId) => {
                body.data[shopId].forEach((product) => {
                    allProductCodes.push(Number(product.productCode));
                });
            });
            const allProductInDb = await productRepository
                .createQueryBuilder('p')
                .andWhere('p.id IN (:...allProductCodes) AND p.status = :status', {
                allProductCodes: allProductCodes,
                status: enums_1.ProductStatus.Active,
            })
                .getMany();
            allShopIds.forEach((shopId) => {
                body.data[shopId].forEach(async (product, index) => {
                    const indexOfProductInDb = (0, utils_1.binarySearchForValidateOrders)(allProductInDb, product.productCode, 0, allProductInDb.length - 1);
                    if (indexOfProductInDb < 0) {
                        throw new exception_1.Exception(enums_1.ErrorCode.Quantity_Invalid, 'One of the products you ordered is not in products list that owner have! Try again!');
                    }
                    const productInDb = allProductInDb[indexOfProductInDb];
                    if (productInDb.sellerId != Number(shopId) ||
                        productInDb.quantityInStock < product.quantity) {
                        throw new exception_1.Exception(enums_1.ErrorCode.Quantity_Invalid, 'One of the products you ordered have that owner is invalid or quantity you ordered is higher than shop have! Try again!');
                    }
                    else {
                        await productRepository
                            .createQueryBuilder('p')
                            .update()
                            .set({
                            quantityInStock: productInDb.quantityInStock - product.quantity,
                            soldQuantity: productInDb.soldQuantity + product.quantity,
                        })
                            .where('id = :productCode', {
                            productCode: product.productCode,
                        })
                            .execute();
                    }
                    body.data[shopId][index].priceEach = productInDb.priceEach;
                });
            });
            if (!!body.voucherId) {
                const voucherInDb = await voucherRepository.findOne({
                    where: {
                        id: body.voucherId,
                        memberId: memberId,
                        status: enums_1.CommonStatus.Active,
                    },
                });
                if (!!!voucherInDb) {
                    throw new exception_1.Exception(enums_1.ErrorCode.Not_Found, 'Your voucher expired or is used!');
                }
                await voucherRepository.save(Object.assign(Object.assign({}, voucherInDb), { status: enums_1.CommonStatus.Inactive, usedAt: Date.now() }));
            }
            await orderCartRepository
                .createQueryBuilder('oc')
                .update()
                .set({ status: enums_1.CommonStatus.Inactive })
                .andWhere('product_code IN (:...allProductCodes) AND customer_id = :memberId AND status =:status', {
                allProductCodes: allProductCodes,
                memberId: memberId,
                status: enums_1.CommonStatus.Active,
            })
                .execute();
            await Promise.all(allShopIds.map(async (shopId) => {
                const order = body.data[shopId];
                const savingOrder = await orderRepository.save({
                    address: body.address,
                    receiverName: body.receiverName,
                    phone: body.phone,
                    customerId: memberId,
                    voucherId: body.voucherId ? body.voucherId : null,
                    TransferringMethodId: +body.transferringMethodId
                        ? +body.transferringMethodId
                        : null,
                    shippingFee: body.voucherId ? 0 : 18000,
                });
                order.forEach(async (product) => {
                    await orderdetailRepository.save({
                        orderId: savingOrder.id,
                        productCode: product.productCode,
                        quantityOrder: product.quantity,
                        priceEach: product.priceEach,
                    });
                });
            }));
            return {
                success: true,
            };
        });
    }
    async orderInShop(memberId) {
        return this.orderRepository
            .createQueryBuilder('o')
            .innerJoinAndMapMany('o.orderDetails', OrderDetail_1.default, 'od', 'o.id = od.orderId')
            .innerJoinAndMapOne('od.product', Product_1.default, 'p', 'p.id = od.productCode AND p.status = :pStatus', { pStatus: enums_1.ProductStatus.Active })
            .innerJoinAndMapOne('p.shop', UserShop_1.default, 'us', 'us.id = p.sellerId AND us.status = :usStatus AND us.ownerId = :usOwnerId', {
            usStatus: enums_1.CommonStatus.Active,
            usOwnerId: memberId,
        })
            .select([
            'o.id',
            'o.orderedAt',
            'o.deletedAt',
            'o.deliveredAt',
            'o.shippedAt',
            'o.status',
            'o.address',
            'o.receiverName',
            'o.phone',
            'o.shippingFee',
            'o.customerId',
            'od.id',
            'od.priceEach',
            'od.quantityOrder',
            'p.id',
            'p.productName',
            'p.quantityInStock',
            'p.priceEach',
            'p.image',
            'p.origin',
            'p.discount',
            'p.soldQuantity',
        ])
            .getMany();
    }
    async updateStatusOrder(memberId, status, orderId) {
        const isOwner = await this.orderRepository
            .createQueryBuilder('o')
            .innerJoinAndMapMany('o.orderDetails', OrderDetail_1.default, 'od', 'o.id = od.orderId')
            .innerJoinAndMapOne('od.product', Product_1.default, 'p', 'p.id = od.productCode AND p.status = :pStatus', { pStatus: enums_1.ProductStatus.Active })
            .innerJoinAndMapOne('p.shop', UserShop_1.default, 'us', 'us.id = p.sellerId AND us.status = :usStatus AND us.ownerId = :usOwnerId', {
            usStatus: enums_1.CommonStatus.Active,
            usOwnerId: memberId,
        })
            .where('o.id = :oOrderId', {
            oOrderId: orderId,
        })
            .getMany();
        if (isOwner.length == 0) {
            throw new exception_1.Exception(enums_1.ErrorCode.Permisstion_Denied, 'You are not owner of this orders');
        }
        return this.orderRepository.update({ id: orderId }, { status: status });
    }
    async updateStatusOrderByUser(memberId, status, orderId) {
        const isBuyer = await this.orderRepository
            .createQueryBuilder('o')
            .where('o.customerId = :memberId AND o.id = :orderId', {
            memberId: memberId,
            orderId: orderId,
        })
            .getOne();
        if (!isBuyer) {
            throw new exception_1.Exception(enums_1.ErrorCode.Permisstion_Denied, 'You are not buyer of this order!');
        }
        if ([
            enums_1.OrderStatus.Shipped,
            enums_1.OrderStatus.Delivering,
            enums_1.OrderStatus.Deleted,
        ].includes(isBuyer.status) ||
            status != enums_1.OrderStatus.Deleted) {
            throw new exception_1.Exception(enums_1.ErrorCode.Permisstion_Denied, 'You cannot update status of this order!');
        }
        return this.orderRepository.update({ id: orderId }, { status: status });
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(Order_1.default)),
    __param(3, (0, typeorm_2.InjectRepository)(OrderDetail_1.default)),
    __param(4, (0, typeorm_2.InjectRepository)(Product_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        auth_service_1.AuthService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map