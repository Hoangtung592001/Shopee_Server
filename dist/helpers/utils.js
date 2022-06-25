"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSort = exports.filterOrderCart = exports.filterOrders = exports.binarySearchForValidateOrders = exports.returnPaging = exports.assignPaging = exports.returnLoadMore = exports.assignLoadMore = void 0;
function assignLoadMore(params) {
    params.pageSize = Number(params.pageSize) || 10;
    return params;
}
exports.assignLoadMore = assignLoadMore;
function returnLoadMore(data, params, metadata = {}) {
    return Object.assign({ paging: true, hasMore: data.length === params.pageSize, data, pageSize: params.pageSize }, metadata);
}
exports.returnLoadMore = returnLoadMore;
function assignPaging(params) {
    params.pageIndex = Number(params.pageIndex) || 1;
    params.pageSize = Number(params.pageSize) || 10;
    params.skip = (params.pageIndex - 1) * params.pageSize;
    return params;
}
exports.assignPaging = assignPaging;
function returnPaging(data, totalItems, params, metadata = {}) {
    const totalPages = Math.ceil(totalItems / params.pageSize);
    return Object.assign({ paging: true, hasMore: params.pageIndex < totalPages, pageIndex: params.pageIndex, totalPages: Math.ceil(totalItems / params.pageSize), totalItems,
        data }, metadata);
}
exports.returnPaging = returnPaging;
function binarySearchForValidateOrders(products, id, start, end) {
    if (start > end)
        return -1;
    let mid = Math.floor((start + end) / 2);
    if (products[mid].id === id)
        return mid;
    if (products[mid].id > id)
        return binarySearchForValidateOrders(products, id, start, mid - 1);
    else
        return binarySearchForValidateOrders(products, id, mid + 1, end);
}
exports.binarySearchForValidateOrders = binarySearchForValidateOrders;
function filterOrders(orders) {
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
exports.filterOrders = filterOrders;
function filterOrderCart(orders) {
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
exports.filterOrderCart = filterOrderCart;
const mergeSort = (arr) => {
    if (arr.length <= 1)
        return arr;
    const right = [...arr];
    const middlePoint = arr.length / 2;
    const left = right.splice(0, middlePoint);
    return mergeUnsortedArrs((0, exports.mergeSort)(left), (0, exports.mergeSort)(right));
};
exports.mergeSort = mergeSort;
const mergeUnsortedArrs = (left, right) => {
    const sortedItems = [];
    while (left.length && right.length) {
        if (left[0].numberOfPurchases <= right[0].numberOfPurchases) {
            sortedItems.push(left.shift());
        }
        else {
            sortedItems.push(right.shift());
        }
    }
    return [...sortedItems, ...left, ...right];
};
//# sourceMappingURL=utils.js.map