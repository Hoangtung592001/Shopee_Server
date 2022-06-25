"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableProduct1650964855238 = void 0;
class CreateTableProduct1650964855238 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`product\` (
          \`id\` int NOT NULL AUTO_INCREMENT,
          \`product_name\` varchar(255) NOT NULL,
          \`product_line\` int NOT NULL,
          \`quantity_in_stock\` bigint unsigned NOT NULL,
          \`price_each\` double unsigned NOT NULL,
          \`image\` varchar(10000) NOT NULL,
          \`origin\` varchar(255) NOT NULL,
          \`discount\` double NOT NULL,
          \`sold_quantity\` bigint unsigned NOT NULL,
          \`shop_type_id\` int unsigned NOT NULL DEFAULT '1',
          \`seller_id\` int unsigned NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`product\``);
    }
}
exports.CreateTableProduct1650964855238 = CreateTableProduct1650964855238;
//# sourceMappingURL=1650964855238-CreateTableProduct.js.map