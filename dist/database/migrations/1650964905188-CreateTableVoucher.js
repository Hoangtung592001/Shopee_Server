"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableVoucher1650964905188 = void 0;
class CreateTableVoucher1650964905188 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`voucher\` (
          \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
          \`member_id\` bigint unsigned NOT NULL,
          \`productCode\` int unsigned NOT NULL,
          \`status\` int unsigned NOT NULL DEFAULT '1' COMMENT '0: Inactive, 1: active',
          \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          \`value\` double unsigned NOT NULL,
          \`expiry_date\` datetime NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`voucher\``);
    }
}
exports.CreateTableVoucher1650964905188 = CreateTableVoucher1650964905188;
//# sourceMappingURL=1650964905188-CreateTableVoucher.js.map