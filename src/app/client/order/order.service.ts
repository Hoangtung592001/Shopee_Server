import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '$shared/auth/auth.service';
import Order from '$database/entities/Order';
import OrderDetail from '$database/entities/OrderDetail';
import { OrderProductDto } from './dto/OrderProductDto.dto';
import Product from '$database/entities/Product';
import { Exception } from '$helpers/exception';
import { CommonStatus, ErrorCode, ProductStatus } from '$types/enums';
import { binarySearchForValidateOrders } from '$helpers/utils';
import Voucher from '$database/entities/Voucher';

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

  async getOrders(memberId: number) {
    return this.orderRepository
      .createQueryBuilder('o')
      .innerJoin('o.orderdetails', 'orderdatails')
      .getMany();
  }

  async orderProduct(memberId: number, body: OrderProductDto) {
    return this.connection.transaction(async (transaction) => {
      const productRepository = transaction.getRepository(Product);

      const orderRepository = transaction.getRepository(Order);

      const orderdetailRepository = transaction.getRepository(OrderDetail);

      const voucherRepository = transaction.getRepository(Voucher);

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
        body.data[shopId].forEach((product) => {
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
          }
        });
      });

      // Check Voucher
      if (!!body.voucherId) {
        const voucherInDb = await voucherRepository.findOne({ where: { id: body.voucherId, memberId: memberId, status: CommonStatus.Active }});
        if (!!!voucherInDb) {
          throw new Exception(ErrorCode.Not_Found, 'Your voucher expired or is used!');
        }

        await voucherRepository.save({
          ...voucherInDb,
          status: CommonStatus.Inactive,
          usedAt: Date.now()
        })
      }

      // Save orders and orderdetails and voucher

      allShopIds.forEach(async (shopId) => {
        const order = body.data[shopId];

        const savingOrder = await orderRepository.save({
          
        })
        body.data[shopId].forEach((product) => {

        });
      });

    });
  }
}
