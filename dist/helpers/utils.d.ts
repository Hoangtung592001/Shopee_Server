import Product from '$database/entities/Product';
import { IReturnOrders, IReturnOrderCart } from '$types/interfaces';
import { LiteralObject } from '@nestjs/common';
export declare function assignLoadMore(params: LiteralObject): LiteralObject;
export declare function returnLoadMore(data: LiteralObject[], params: LiteralObject, metadata?: {}): {
    paging: boolean;
    hasMore: boolean;
    data: LiteralObject[];
    pageSize: any;
};
export declare function assignPaging(params: LiteralObject): LiteralObject;
export declare function returnPaging(data: LiteralObject[], totalItems: number, params: LiteralObject, metadata?: {}): {
    paging: boolean;
    hasMore: boolean;
    pageIndex: any;
    totalPages: number;
    totalItems: number;
    data: LiteralObject[];
};
export declare function binarySearchForValidateOrders(products: Product[], id: number, start: number, end: number): any;
export declare function filterOrders(orders: IReturnOrders[]): {};
export declare function filterOrderCart(orders: IReturnOrderCart[]): {};
export declare const mergeSort: (arr: any) => any;
