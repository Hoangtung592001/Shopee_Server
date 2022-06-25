"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableShopType1650964865960 = void 0;
class CreateTableShopType1650964865960 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`shop_type\` (
          \`shop_type_id\` int unsigned NOT NULL AUTO_INCREMENT,
          \`shop_name\` varchar(255) NOT NULL,
          PRIMARY KEY (\`shop_type_id\`)
        ) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`shop_type\``);
    }
}
exports.CreateTableShopType1650964865960 = CreateTableShopType1650964865960;
//# sourceMappingURL=1650964865960-CreateTableShopType.js.map