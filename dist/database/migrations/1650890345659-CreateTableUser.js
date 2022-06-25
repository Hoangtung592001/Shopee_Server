"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUser1650890345659 = void 0;
class CreateTableUser1650890345659 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (
      \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
      \`email\` varchar(255) NOT NULL,
      \`password\` varchar(255) NOT NULL,
      \`username\` varchar(255) NOT NULL,
      \`date_of_birth\` date DEFAULT NULL,
      \`refresh_token\` varchar(1000) DEFAULT NULL,
      \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      \`role_id\` bigint unsigned NOT NULL DEFAULT '1',
      \`status\` tinyint NOT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
exports.CreateTableUser1650890345659 = CreateTableUser1650890345659;
//# sourceMappingURL=1650890345659-CreateTableUser.js.map