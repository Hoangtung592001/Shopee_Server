"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenderStatus = exports.TransferringMethodStatus = exports.ProductStatus = exports.CommonStatus = exports.OrderStatus = exports.ShopType = exports.SearchIndex = exports.Action = exports.ErrorCode = exports.TokenType = exports.Role = void 0;
var Role;
(function (Role) {
    Role["User"] = "user";
    Role["Admin"] = "admin";
})(Role = exports.Role || (exports.Role = {}));
var TokenType;
(function (TokenType) {
    TokenType["ACCESS_TOKEN"] = "ACCESS_TOKEN";
    TokenType["REFRESH_TOKEN"] = "REFRESH_TOKEN";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["Unknown_Error"] = "Unknown_Error";
    ErrorCode["Invalid_Input"] = "Invalid_Input";
    ErrorCode["Not_Found"] = "Not_Found";
    ErrorCode["Token_Not_Exist"] = "Token_Not_Exist";
    ErrorCode["Forbidden_Resource"] = "Forbidden_Resource";
    ErrorCode["Unauthorized"] = "Unauthorized";
    ErrorCode["Email_Already_Exist"] = "Email_Already_Exist";
    ErrorCode["Email_Or_Password_Not_valid"] = "Email_Or_Password_Not_valid";
    ErrorCode["Resource_Already_Exists"] = "Resource_Already_Exists";
    ErrorCode["Can_Not_Disable_Default_language"] = "Can_Not_Disable_Default_language";
    ErrorCode["Old_Password_Incorrect"] = "Old_Password_Incorrect";
    ErrorCode["Quantity_Invalid"] = "Quantity_Invalid";
    ErrorCode["Product_Not_Found"] = "Product_Not_Found";
    ErrorCode["Delete_Judge_Invalid"] = "Delete_Judge_Invalid";
    ErrorCode["Not_Register_Shop"] = "Not_Register_Shop";
    ErrorCode["Already_Register_Shop"] = "Already_Register_Shop";
    ErrorCode["Permisstion_Denied"] = "Permisstion_Denied";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
var Action;
(function (Action) {
    Action["Manage"] = "manage";
    Action["Read"] = "read";
    Action["Update"] = "update";
    Action["Delete"] = "delete";
})(Action = exports.Action || (exports.Action = {}));
var SearchIndex;
(function (SearchIndex) {
    SearchIndex["Product"] = "product";
})(SearchIndex = exports.SearchIndex || (exports.SearchIndex = {}));
var ShopType;
(function (ShopType) {
    ShopType[ShopType["Normal"] = 1] = "Normal";
    ShopType[ShopType["Mall"] = 2] = "Mall";
})(ShopType = exports.ShopType || (exports.ShopType = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Deleted"] = 0] = "Deleted";
    OrderStatus[OrderStatus["Preparing"] = 1] = "Preparing";
    OrderStatus[OrderStatus["Delivering"] = 2] = "Delivering";
    OrderStatus[OrderStatus["Shipped"] = 3] = "Shipped";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var CommonStatus;
(function (CommonStatus) {
    CommonStatus[CommonStatus["Inactive"] = 0] = "Inactive";
    CommonStatus[CommonStatus["Active"] = 1] = "Active";
})(CommonStatus = exports.CommonStatus || (exports.CommonStatus = {}));
var ProductStatus;
(function (ProductStatus) {
    ProductStatus[ProductStatus["Deleted"] = 0] = "Deleted";
    ProductStatus[ProductStatus["Active"] = 1] = "Active";
    ProductStatus[ProductStatus["SoldOff"] = 2] = "SoldOff";
})(ProductStatus = exports.ProductStatus || (exports.ProductStatus = {}));
var TransferringMethodStatus;
(function (TransferringMethodStatus) {
    TransferringMethodStatus[TransferringMethodStatus["Fast"] = 1] = "Fast";
    TransferringMethodStatus[TransferringMethodStatus["Normal"] = 2] = "Normal";
})(TransferringMethodStatus = exports.TransferringMethodStatus || (exports.TransferringMethodStatus = {}));
var GenderStatus;
(function (GenderStatus) {
    GenderStatus[GenderStatus["Male"] = 1] = "Male";
    GenderStatus[GenderStatus["Female"] = 2] = "Female";
})(GenderStatus = exports.GenderStatus || (exports.GenderStatus = {}));
//# sourceMappingURL=index.js.map