"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableLike1650964816825 = void 0;
class CreateTableLike1650964816825 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`like\` (
                \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
                \`member_id\` bigint unsigned NOT NULL,
                \`productCode\` int unsigned NOT NULL,
                \`status\` int unsigned NOT NULL DEFAULT '1' COMMENT '0: Inactive, 1: active',
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
              ) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`like\``);
    }
}
exports.CreateTableLike1650964816825 = CreateTableLike1650964816825;
//# sourceMappingURL=1650964816825-CreateTableLike.js.map