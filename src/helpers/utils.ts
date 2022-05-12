import Order from '$database/entities/Order';
import Product from '$database/entities/Product';
import { IReturnOrders, IReturnOrderCart } from '$types/interfaces';
import { LiteralObject } from '@nestjs/common';
import { camelCase } from 'lodash';

export function assignLoadMore(params: LiteralObject) {
  params.pageSize = Number(params.pageSize) || 10;

  return params;
}

export function returnLoadMore(
  data: LiteralObject[],
  params: LiteralObject,
  metadata = {},
) {
  return {
    paging: true,
    hasMore: data.length === params.pageSize,
    data,
    pageSize: params.pageSize,
    ...metadata,
  };
}

export function assignPaging(params: LiteralObject) {
  params.pageIndex = Number(params.pageIndex) || 1;
  params.pageSize = Number(params.pageSize) || 10;
  params.skip = (params.pageIndex - 1) * params.pageSize;

  return params;
}

export function returnPaging(
  data: LiteralObject[],
  totalItems: number,
  params: LiteralObject,
  metadata = {},
) {
  const totalPages = Math.ceil(totalItems / params.pageSize);
  return {
    paging: true,
    hasMore: params.pageIndex < totalPages,
    pageIndex: params.pageIndex,
    totalPages: Math.ceil(totalItems / params.pageSize),
    totalItems,
    data,
    ...metadata,
  };
}

export function binarySearchForValidateOrders(
  products: Product[],
  id: number,
  start: number,
  end: number,
) {
  if (start > end) return -1;

  let mid = Math.floor((start + end) / 2);

  if (products[mid].id === id) return mid;

  if (products[mid].id > id)
    return binarySearchForValidateOrders(products, id, start, mid - 1);
  else return binarySearchForValidateOrders(products, id, mid + 1, end);
}

export function filterOrders(orders: IReturnOrders[]) {
  const results = {};

  orders.forEach((order) => {
    if (!!!results[order.orderId.toString()]) {
      results[order.orderId.toString()] = {};
      results[order.orderId.toString()].shopName = order.shopName;
      results[order.orderId.toString()].shopImage = order.shopImage;
      results[order.orderId.toString()].shopId = order.shopId;
      results[order.orderId.toString()].data = [];
    }
    results[order.orderId.toString()].data.push({
      productImage: order.productImage,
      productStatus: order.productStatus,
      quantity: order.quantity,
      priceEach: order.priceEach,
      productName: order.productName,
      productCode: order.productCode,
    });
  });

  return results;
}

export function filterOrderCart(orders: IReturnOrderCart[]) {
  const results = {};

  orders.forEach((order) => {
    if (!!!results[order.shopId.toString()]) {
      results[order.shopId.toString()] = {};
      results[order.shopId.toString()].shopName = order.shopName;
      results[order.shopId.toString()].shopImage = order.shopImage;
      results[order.shopId.toString()].data = [];
    }
    results[order.shopId.toString()].data.push({
      productImage: order.productImage,
      productStatus: order.productStatus,
      quantity: order.quantity,
      priceEach: order.priceEach,
      productName: order.productName,
      productCode: order.productCode,
    });
  });

  return results;
}

