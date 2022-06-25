"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableOrderCart1650964842416 = void 0;
class CreateTableOrderCart1650964842416 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`orders_cart\` (
          \`order_id\` bigint unsigned NOT NULL AUTO_INCREMENT,
          \`product_code\` varchar(255) NOT NULL,
          \`quantity_order\` int unsigned NOT NULL,
          \`customer_id\` bigint unsigned NOT NULL,
          PRIMARY KEY (\`order_id\`)
        ) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`orders_cart\``);
    }
}
exports.CreateTableOrderCart1650964842416 = CreateTableOrderCart1650964842416;
//# sourceMappingURL=1650964842416-CreateTableOrderCart.js.map