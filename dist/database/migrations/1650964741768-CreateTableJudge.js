"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableJudge1650964741768 = void 0;
class CreateTableJudge1650964741768 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`judge\` (
            \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
            \`member_id\` bigint unsigned NOT NULL,
            \`productCode\` int unsigned NOT NULL,
            \`content\` varchar(5000) NOT NULL,
            \`status\` int unsigned NOT NULL DEFAULT '1' COMMENT '0: Inactive, 1: active',
            \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            PRIMARY KEY (\`id\`)
          )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`judge\``);
    }
}
exports.CreateTableJudge1650964741768 = CreateTableJudge1650964741768;
//# sourceMappingURL=1650964741768-CreateTableJudge.js.map