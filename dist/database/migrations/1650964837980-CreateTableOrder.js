"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableOrder1650964837980 = void 0;
class CreateTableOrder1650964837980 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`order\` (
          \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
          \`ordered_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          \`shipped_date\` datetime NOT NULL,
          \`comment\` varchar(1000) DEFAULT NULL,
          \`address\` varchar(1000) NOT NULL,
          \`customer_id\` bigint unsigned NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`order\``);
    }
}
exports.CreateTableOrder1650964837980 = CreateTableOrder1650964837980;
//# sourceMappingURL=1650964837980-CreateTableOrder.js.map