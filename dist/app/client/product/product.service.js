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
exports.ProductService = void 0;
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
const ProductRecent_1 = require("../../../database/entities/ProductRecent");
const Judge_1 = require("../../../database/entities/Judge");
const Like_1 = require("../../../database/entities/Like");
const Image_1 = require("../../../database/entities/Image");
const Order_1 = require("../../../database/entities/Order");
const OrderDetail_1 = require("../../../database/entities/OrderDetail");
const typeorm_3 = require("typeorm");
const cloudinary = require('cloudinary');
const fs = require('fs');
const camelcaseKeys = require('camelcase-keys');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
let ProductService = class ProductService {
    constructor(connection, authService, productRepository, orderCartRepository, userShopRepository, userRepository, productRecentRepository, judgeRepository, likeRepository, imageRepository) {
        this.connection = connection;
        this.authService = authService;
        this.productRepository = productRepository;
        this.orderCartRepository = orderCartRepository;
        this.userShopRepository = userShopRepository;
        this.userRepository = userRepository;
        this.productRecentRepository = productRecentRepository;
        this.judgeRepository = judgeRepository;
        this.likeRepository = likeRepository;
        this.imageRepository = imageRepository;
        this.removeTmp = (path) => {
            fs.unlink(path, (err) => {
                if (err)
                    throw err;
            });
        };
    }
    async getAllProducts(params) {
        const results = this.productRepository
            .createQueryBuilder('p')
            .leftJoinAndMapMany('p.judges', Judge_1.default, 'j', 'p.id = j.productCode')
            .where('p.status = :pStatus', { pStatus: enums_1.ProductStatus.Active });
        if (params.type > 1) {
            results.andWhere('p.productLine = :productLine', {
                productLine: params.type,
            });
        }
        return results.orderBy('p.id', 'DESC').getMany();
    }
    async addProduct(product, user) {
        const userHaveShop = await this.userShopRepository.findOne({
            where: { ownerId: user.id },
        });
        if (!!!userHaveShop) {
            throw new exception_1.Exception(enums_1.ErrorCode.Not_Register_Shop, "You don' have shop now! Please register first!");
        }
        const { otherPhotos } = product, filteredProduct = __rest(product, ["otherPhotos"]);
        const savingProduct = Object.assign(Object.assign({}, filteredProduct), { sellerId: userHaveShop.id });
        const savedProduct = await this.productRepository.save(savingProduct);
        const savingOthersPhoto = otherPhotos.map((photo) => {
            return {
                productCode: savedProduct.id,
                name: photo,
            };
        });
        this.imageRepository.insert(savingOthersPhoto);
        return savedProduct;
    }
    async getProduct(id) {
        const queryBuilder = await this.productRepository
            .createQueryBuilder('p')
            .innerJoinAndMapOne('p.shop', UserShop_1.default, 'us', 'p.sellerId = us.id')
            .leftJoinAndMapMany('p.judges', Judge_1.default, 'j', 'j.productCode = p.id')
            .leftJoinAndMapOne('j.user', User_1.default, 'u', 'u.id = j.memberId')
            .leftJoinAndMapMany('p.otherImages', Image_1.default, 'i', 'i.productCode = p.id AND i.status = :iStatus', { iStatus: enums_1.CommonStatus.Active })
            .leftJoinAndMapMany('us.products', Product_1.default, 'p1', 'p1.sellerId = us.id AND p1.status = :p1Status', { p1Status: enums_1.ProductStatus.Active })
            .leftJoinAndMapMany('p1.judges', Judge_1.default, 'j1', 'j1.productCode = p1.id')
            .innerJoinAndMapOne('us.member', User_1.default, 'u1', 'u1.id = us.ownerId AND u1.status = :u1Status', { u1Status: enums_1.CommonStatus.Active })
            .select([
            'p.id',
            'p.productName',
            'p.productLine',
            'p.quantityInStock',
            'p.priceEach',
            'p.image',
            'p.description',
            'p.origin',
            'p.discount',
            'p.soldQuantity',
            'us.id',
            'us.shopName',
            'us.coverPhoto',
            'us.profilePicture',
            'j.id',
            'j.content',
            'j.stars',
            'u.id',
            'u.email',
            'u.username',
            'u.image',
            'i.id',
            'i.name',
            'p1.id',
            'p1.image',
            'p1.productName',
            'p1.soldQuantity',
            'p1.priceEach',
            'j1.id',
            'j1.stars',
            'u1.id',
            'u1.username',
            'u1.image',
        ])
            .orderBy('p1.soldQuantity', 'DESC')
            .where('p.id = :pId AND p.status = :pStatus', {
            pId: id,
            pStatus: enums_1.ProductStatus.Active,
        })
            .getOne();
        return queryBuilder;
    }
    async getProducByUser(userId, productId) {
        const queryBuilder = await this.productRepository
            .createQueryBuilder('p')
            .innerJoinAndMapOne('p.shop', UserShop_1.default, 'us', 'p.sellerId = us.id')
            .leftJoinAndMapMany('p.judges', Judge_1.default, 'j', 'j.productCode = p.id')
            .leftJoinAndMapOne('j.user', User_1.default, 'u', 'u.id = j.memberId')
            .leftJoinAndMapMany('p.otherImages', Image_1.default, 'i', 'i.productCode = p.id AND i.status = :iStatus', { iStatus: enums_1.CommonStatus.Active })
            .leftJoinAndMapMany('us.products', Product_1.default, 'p1', 'p1.sellerId = us.id AND p1.status = :p1Status', { p1Status: enums_1.ProductStatus.Active })
            .leftJoinAndMapMany('p1.judges', Judge_1.default, 'j1', 'j1.productCode = p1.id')
            .innerJoinAndMapOne('us.member', User_1.default, 'u1', 'u1.id = us.ownerId AND u1.status = :u1Status', { u1Status: enums_1.CommonStatus.Active })
            .leftJoinAndMapOne('p.like', Like_1.default, 'l', 'l.productCode = p.id AND l.memberId = :memberId AND l.status = :lStatus', { memberId: userId, lStatus: enums_1.CommonStatus.Active })
            .select([
            'p.id',
            'p.productName',
            'p.productLine',
            'p.quantityInStock',
            'p.priceEach',
            'p.image',
            'p.description',
            'p.origin',
            'p.discount',
            'p.soldQuantity',
            'us.id',
            'us.shopName',
            'us.coverPhoto',
            'us.profilePicture',
            'j.id',
            'j.content',
            'j.stars',
            'u.id',
            'u.email',
            'u.username',
            'u.image',
            'i.id',
            'i.name',
            'p1.id',
            'p1.image',
            'p1.productName',
            'p1.soldQuantity',
            'p1.priceEach',
            'j1.id',
            'j1.stars',
            'u1.id',
            'u1.username',
            'u1.image',
            'l.id',
        ])
            .orderBy('p1.soldQuantity', 'DESC')
            .where('p.id = :pId', { pId: productId })
            .getOne();
        return queryBuilder;
    }
    async deleteProduct(id, user) {
        try {
            const userHaveShop = await this.userShopRepository.findOne({
                where: { ownerId: user.id },
            });
            if (!!!userHaveShop) {
                throw new exception_1.Exception(enums_1.ErrorCode.Not_Register_Shop, "You don' have shop now! Please register first!");
            }
            const productInDb = await this.productRepository.findOne(id);
            if (productInDb.sellerId != userHaveShop.id) {
                throw new exception_1.Exception(enums_1.ErrorCode.Forbidden_Resource, 'You are not owner of this products');
            }
            await this.productRepository.update({ id: productInDb.id }, { status: enums_1.ProductStatus.Deleted });
            return {
                success: true,
            };
        }
        catch (error) {
            throw new exception_1.Exception(enums_1.ErrorCode.Unknown_Error, (error === null || error === void 0 ? void 0 : error.message) || 'Unknown_Error');
        }
    }
    async changeInfoProduct(productId, productInfo, memberId) {
        const { otherImages } = productInfo, savingProducts = __rest(productInfo, ["otherImages"]);
        const productInDb = await this.productRepository
            .createQueryBuilder('p')
            .leftJoinAndMapMany('p.otherImages', Image_1.default, 'i', 'i.productCode = p.id AND i.status = :iStatus', { iStatus: enums_1.CommonStatus.Active })
            .innerJoinAndMapOne('p.shop', UserShop_1.default, 'us', 'us.id = p.sellerId AND us.status = :usStatus', { usStatus: enums_1.CommonStatus.Active })
            .where('p.id = :pProductId', { pProductId: productId })
            .getOne();
        if (!productInDb) {
            throw new exception_1.Exception(enums_1.ErrorCode.Not_Found, 'Cannot Found this product!');
        }
        if (productInDb['shop'].ownerId != memberId) {
            throw new exception_1.Exception(enums_1.ErrorCode.Permisstion_Denied, 'You cannot change info of this product');
        }
        const otherImagesIds = productInDb['otherImages']
            ? productInDb['otherImages'].map((image) => {
                return image.id;
            })
            : [];
        await this.productRepository.update({ id: productId }, savingProducts);
        await this.imageRepository
            .createQueryBuilder('i')
            .delete()
            .where('id IN (:otherImagesIds)', { otherImagesIds: otherImagesIds })
            .execute();
        const savingImages = otherImages
            ? otherImages.map((image) => {
                return {
                    name: image,
                    productCode: productId,
                };
            })
            : [];
        await this.imageRepository.insert(savingImages);
        return {
            success: true,
        };
    }
    async recentVisited(memberId, productCode) {
        const productInDb = await this.productRepository.findOne({
            where: { id: productCode },
        });
        if (!!!productInDb || productInDb.status == enums_1.ProductStatus.Deleted) {
            throw new exception_1.Exception(enums_1.ErrorCode.Not_Found, 'Product you visited is not found!');
        }
        return this.productRecentRepository.save({
            visitorId: memberId,
            productCode: productCode,
        });
    }
    async getRecentVisitedProduct(memberId, params) {
        const queryBuilder = this.productRepository
            .createQueryBuilder('p')
            .innerJoinAndMapOne('p.judges', ProductRecent_1.default, 'pr', 'p.id = pr.productCode')
            .where('pr.visitorId = :prMemberId  AND p.status = :pStatus', {
            prMemberId: memberId,
            pStatus: enums_1.ProductStatus.Active,
        })
            .select([
            'pr.id',
            'pr.productCode',
            'p.id',
            'p.productName',
            'p.discount',
            'p.soldQuantity',
            'p.priceEach',
            'p.origin',
            'p.image',
        ]);
        const results = await queryBuilder.orderBy('pr.id', 'DESC').getMany();
        return results;
    }
    async getLikedProducts(memberId) {
        const results = await this.productRepository
            .createQueryBuilder('p')
            .innerJoinAndMapMany('p.likes', Like_1.default, 'l', 'l.productCode = p.id AND p.status = :pStatus AND l.status = :lStatus', { pStatus: enums_1.ProductStatus.Active, lStatus: enums_1.CommonStatus.Active })
            .innerJoinAndMapOne('l.user', User_1.default, 'u', 'u.id = l.memberId AND u.status = :uStatus AND u.id = :uMemberId', {
            uStatus: enums_1.CommonStatus.Active,
            uMemberId: memberId,
        })
            .select([
            'p.id',
            'p.productName',
            'p.priceEach',
            'p.soldQuantity',
            'p.discount',
            'p.image',
        ])
            .getMany();
        return results;
    }
    async getInfoOrder(memberId) {
        const results = (await this.userRepository
            .createQueryBuilder('u')
            .leftJoinAndMapOne('u.shop', UserShop_1.default, 'us', 'us.ownerId = u.id AND us.status = :usStatus', { usStatus: enums_1.CommonStatus.Active })
            .leftJoinAndMapMany('u.orders', Order_1.default, 'o', 'o.customerId = u.id')
            .leftJoinAndMapMany('o.orderDetails', OrderDetail_1.default, 'od', 'od.orderId = o.id')
            .leftJoinAndMapOne('od.product', Product_1.default, 'p', 'p.id = od.productCode AND p.status = :pStatus', { pStatus: enums_1.ProductStatus.Active })
            .leftJoinAndMapOne('p.judge', Judge_1.default, 'j', 'j.productCode = p.id AND j.status = :jStatus AND j.memberId = :jMemberId', {
            jStatus: enums_1.CommonStatus.Active,
            jMemberId: memberId,
        })
            .leftJoinAndMapOne('p.shop', UserShop_1.default, 'us1', 'us1.id = p.sellerId AND us1.status = :us1Status', { us1Status: enums_1.CommonStatus.Active })
            .select([
            'u.id',
            'u.email',
            'u.username',
            'u.image',
            'us.id',
            'us.shopName',
            'o.id',
            'o.orderedAt',
            'o.deletedAt',
            'o.deliveredAt',
            'o.shippedAt',
            'o.address',
            'o.status',
            'od.id',
            'od.quantityOrder',
            'od.priceEach',
            'p.id',
            'p.productName',
            'p.quantityInStock',
            'p.priceEach',
            'p.image',
            'p.origin',
            'p.discount',
            'p.soldQuantity',
            'us1.id',
            'us1.shopName',
            'j.id',
        ])
            .where('u.id = :memberId', { memberId: memberId })
            .getOne());
        const allOrders = {
            deletedOrders: [],
            deliveringOrders: [],
            waitingForDeliveringProducts: [],
            deliveredProducts: [],
        };
        results === null || results === void 0 ? void 0 : results['orders'].forEach((order) => {
            order.orderDetails.forEach((orderDetail) => {
                orderDetail.orderId = order.id;
                if (order.status == enums_1.OrderStatus.Deleted && orderDetail.product) {
                    allOrders.deletedOrders.push(orderDetail);
                }
                else if (order.status == enums_1.OrderStatus.Delivering &&
                    orderDetail.product) {
                    allOrders.deliveringOrders.push(orderDetail);
                }
                else if (order.status == enums_1.OrderStatus.Preparing &&
                    orderDetail.product) {
                    allOrders.waitingForDeliveringProducts.push(orderDetail);
                }
                else if (order.status == enums_1.OrderStatus.Shipped && orderDetail.product) {
                    allOrders.deliveredProducts.push(orderDetail);
                }
            });
        });
        results.orders = allOrders;
        results.shop = !results.shop ? {} : results.shop;
        return results;
    }
    async listSearchProducts(keywords) {
        const entityManager = (0, typeorm_3.getManager)();
        const query = `SELECT DISTINCT product_name as productName FROM product WHERE product_name LIKE "%${keywords}%"`;
        return entityManager.query(query, []);
    }
    async searchProducts(keywords) {
        return this.productRepository.find({
            where: {
                productName: keywords,
            },
        });
    }
    async getAllProductsInShop(memberId) {
        const results = this.productRepository
            .createQueryBuilder('p')
            .leftJoinAndMapMany('p.judges', Judge_1.default, 'j', 'p.id = j.productCode AND j.status = :jStatus', { jStatus: enums_1.CommonStatus.Active })
            .innerJoinAndMapOne('p.shop', UserShop_1.default, 'us', 'us.id = p.sellerId AND us.status = :usStatus', { usStatus: enums_1.CommonStatus.Active })
            .innerJoinAndMapOne('us.member', User_1.default, 'u', 'u.id = us.ownerId AND u.status = :uStatus AND u.id = :memberId', { uStatus: enums_1.CommonStatus.Active, memberId: memberId })
            .leftJoinAndMapMany('p.otherImages', Image_1.default, 'i', 'i.productCode = p.id AND i.status = :iStatus', { iStatus: enums_1.CommonStatus.Active })
            .select([
            'p.id',
            'p.productName',
            'p.productLine',
            'p.quantityInStock',
            'p.priceEach',
            'p.image',
            'p.description',
            'p.origin',
            'p.discount',
            'p.soldQuantity',
            'us.id',
            'us.shopName',
            'j.id',
            'j.content',
            'j.stars',
            'u.id',
            'u.email',
            'u.username',
            'u.image',
            'i.name',
            'i.id',
        ])
            .where('p.status = :pStatus', { pStatus: enums_1.ProductStatus.Active });
        return results.orderBy('p.id', 'DESC').getMany();
    }
    async uploadProductImage(file) {
        try {
            if (!file || Object.keys(file).length === 0) {
                return { msg: 'No Files are Selected.' };
            }
            if (file.size > 1024 * 1024) {
                return { msg: 'File size is to Large.' };
            }
            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                return { msg: 'File Format is Incorrect.' };
            }
            return cloudinary.v2.uploader.upload(file.path, { folder: 'multivendor-shop' }, async (err, result) => {
                fs.unlinkSync('./' + file.path);
                if (err) {
                    console.log(err);
                    throw err;
                }
                return {
                    public_id: result.public_id,
                    url: result.secure_url,
                };
            });
        }
        catch (error) {
            throw new exception_1.Exception(enums_1.ErrorCode.Permisstion_Denied, error.message);
        }
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(Product_1.default)),
    __param(3, (0, typeorm_2.InjectRepository)(OrderCart_1.default)),
    __param(4, (0, typeorm_2.InjectRepository)(UserShop_1.default)),
    __param(5, (0, typeorm_2.InjectRepository)(User_1.default)),
    __param(6, (0, typeorm_2.InjectRepository)(ProductRecent_1.default)),
    __param(7, (0, typeorm_2.InjectRepository)(Judge_1.default)),
    __param(8, (0, typeorm_2.InjectRepository)(Like_1.default)),
    __param(9, (0, typeorm_2.InjectRepository)(Image_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        auth_service_1.AuthService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map