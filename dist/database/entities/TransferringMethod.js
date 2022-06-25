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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let TransferringMethod = class TransferringMethod {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'id',
        type: 'int',
        unsigned: true,
    }),
    __metadata("design:type", Number)
], TransferringMethod.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'method_name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TransferringMethod.prototype, "methodName", void 0);
TransferringMethod = __decorate([
    (0, typeorm_1.Entity)({ name: 'transferring_method' })
], TransferringMethod);
exports.default = TransferringMethod;
//# sourceMappingURL=TransferringMethod.js.map