import Product from '$database/entities/Product';
import { LiteralObject } from '@nestjs/common';

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
