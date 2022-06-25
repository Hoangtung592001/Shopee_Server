import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '$shared/auth/auth.service';
import Order from '$database/entities/Order';
import OrderDetail from '$database/entities/OrderDetail';
import { OrderProductDto } from './dto/OrderProductDto.dto';
import Product from '$database/entities/Product';
import { Exception } from '$helpers/exception';
import {
  CommonStatus,
  ErrorCode,
  OrderStatus,
  ProductStatus,
} from '$types/enums';
import { binarySearchForValidateOrders } from '$helpers/utils';
import Voucher from '$database/entities/Voucher';
import TransferringMethod from '$database/entities/TransferringMethod';
import OrderCart from '$database/entities/OrderCart';
import UserShop from '$database/entities/UserShop';
import { LoadMoreOrderDto } from './dto/LoadMoreOrderDto.dto';
import User from '$database/entities/User';
import { filterOrders } from '$helpers/utils';
import { number } from 'joi';
@Injectable()
export class OrderService {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderdetailRepository: Repository<OrderDetail>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getOrders(memberId: number, params: LoadMoreOrderDto) {
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
      .innerJoin(OrderDetail, 'od', 'o.id = od.order_id')
      .innerJoin(Product, 'p', 'od.product_code = p.id')
      .innerJoin(UserShop, 'us', 'us.id = p.seller_id')
      .innerJoin(User, 'u', 'u.id = us.owner_id')
      .andWhere('o.status != :status AND o.customer_id = :memberId', {
        status: OrderStatus.Deleted,
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

    return filterOrders(results);
  }

  async orderProduct(memberId: number, body: OrderProductDto) {
    return this.connection.transaction(async (transaction) => {
      const productRepository = transaction.getRepository(Product);

      const orderRepository = transaction.getRepository(Order);

      const orderdetailRepository = transaction.getRepository(OrderDetail);

      const voucherRepository = transaction.getRepository(Voucher);

      const orderCartRepository = transaction.getRepository(OrderCart);

      const allShopIds = Object.keys(body.data);

      const allProductCodes = [];

      // get all productCode
      allShopIds.forEach((shopId) => {
        body.data[shopId].forEach((product) => {
          allProductCodes.push(Number(product.productCode));
        });
      });

      // get products in DB
      const allProductInDb = await productRepository
        .createQueryBuilder('p')
        .andWhere('p.id IN (:...allProductCodes) AND p.status = :status', {
          allProductCodes: allProductCodes,
          status: ProductStatus.Active,
        })
        .getMany();

      // Check owner and quantity
      allShopIds.forEach((shopId) => {
        body.data[shopId].forEach(async (product, index) => {
          const indexOfProductInDb = binarySearchForValidateOrders(
            allProductInDb,
            product.productCode,
            0,
            allProductInDb.length - 1,
          );
          if (indexOfProductInDb < 0) {
            throw new Exception(
              ErrorCode.Quantity_Invalid,
              'One of the products you ordered is not in products list that owner have! Try again!',
            );
          }
          const productInDb = allProductInDb[indexOfProductInDb];
          if (
            productInDb.sellerId != Number(shopId) ||
            productInDb.quantityInStock < product.quantity
          ) {
            throw new Exception(
              ErrorCode.Quantity_Invalid,
              'One of the products you ordered have that owner is invalid or quantity you ordered is higher than shop have! Try again!',
            );
          } else {
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

      // Check Voucher
      if (!!body.voucherId) {
        const voucherInDb = await voucherRepository.findOne({
          where: {
            id: body.voucherId,
            memberId: memberId,
            status: CommonStatus.Active,
          },
        });
        if (!!!voucherInDb) {
          throw new Exception(
            ErrorCode.Not_Found,
            'Your voucher expired or is used!',
          );
        }

        await voucherRepository.save({
          ...voucherInDb,
          status: CommonStatus.Inactive,
          usedAt: Date.now(),
        });
      }

      // Delete from order cart.
      await orderCartRepository
        .createQueryBuilder('oc')
        .update()
        .set({ status: CommonStatus.Inactive })
        .andWhere(
          'product_code IN (:...allProductCodes) AND customer_id = :memberId AND status =:status',
          {
            allProductCodes: allProductCodes,
            memberId: memberId,
            status: CommonStatus.Active,
          },
        )
        .execute();

      // Save orders and orderdetails and voucher

      await Promise.all(
        allShopIds.map(async (shopId) => {
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
        }),
      );
      return {
        success: true,
      };
    });
  }

  async orderInShop(memberId: number) {
    return this.orderRepository
      .createQueryBuilder('o')
      .innerJoinAndMapMany(
        'o.orderDetails',
        OrderDetail,
        'od',
        'o.id = od.orderId',
      )
      .innerJoinAndMapOne(
        'od.product',
        Product,
        'p',
        'p.id = od.productCode AND p.status = :pStatus',
        { pStatus: ProductStatus.Active },
      )
      .innerJoinAndMapOne(
        'p.shop',
        UserShop,
        'us',
        'us.id = p.sellerId AND us.status = :usStatus AND us.ownerId = :usOwnerId',
        {
          usStatus: CommonStatus.Active,
          usOwnerId: memberId,
        },
      )
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
  async updateStatusOrder(
    memberId: number,
    status: OrderStatus,
    orderId: number,
  ) {
    const isOwner = await this.orderRepository
      .createQueryBuilder('o')
      .innerJoinAndMapMany(
        'o.orderDetails',
        OrderDetail,
        'od',
        'o.id = od.orderId',
      )
      .innerJoinAndMapOne(
        'od.product',
        Product,
        'p',
        'p.id = od.productCode AND p.status = :pStatus',
        { pStatus: ProductStatus.Active },
      )
      .innerJoinAndMapOne(
        'p.shop',
        UserShop,
        'us',
        'us.id = p.sellerId AND us.status = :usStatus AND us.ownerId = :usOwnerId',
        {
          usStatus: CommonStatus.Active,
          usOwnerId: memberId,
        },
      )
      .where('o.id = :oOrderId', {
        oOrderId: orderId,
      })
      .getMany();
    if (isOwner.length == 0) {
      throw new Exception(
        ErrorCode.Permisstion_Denied,
        'You are not owner of this orders',
      );
    }

    return this.orderRepository.update({ id: orderId }, { status: status });
  }

  async updateStatusOrderByUser(
    memberId: number,
    status: OrderStatus,
    orderId: number,
  ) {
    const isBuyer = await this.orderRepository
      .createQueryBuilder('o')
      .where('o.customerId = :memberId AND o.id = :orderId', {
        memberId: memberId,
        orderId: orderId,
      })
      .getOne();
    if (!isBuyer) {
      throw new Exception(
        ErrorCode.Permisstion_Denied,
        'You are not buyer of this order!',
      );
    }

    if (
      [
        OrderStatus.Shipped,
        OrderStatus.Delivering,
        OrderStatus.Deleted,
      ].includes(isBuyer.status) ||
      status != OrderStatus.Deleted
    ) {
      throw new Exception(
        ErrorCode.Permisstion_Denied,
        'You cannot update status of this order!',
      );
    }
    return this.orderRepository.update({ id: orderId }, { status: status });
  }
}
