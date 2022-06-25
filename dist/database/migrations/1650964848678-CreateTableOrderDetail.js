"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableOrderDetail1650964848678 = void 0;
class CreateTableOrderDetail1650964848678 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`order_detail\` (
          \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
          \`order_id\` bigint unsigned NOT NULL,
          \`product_code\` varchar(255) NOT NULL,
          \`quantity_order\` int unsigned NOT NULL,
          \`customer_id\` bigint unsigned NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`order_detail\``);
    }
}
exports.CreateTableOrderDetail1650964848678 = CreateTableOrderDetail1650964848678;
//# sourceMappingURL=1650964848678-CreateTableOrderDetail.js.map