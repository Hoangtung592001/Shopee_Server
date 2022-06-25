"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUserRole1650964896354 = void 0;
class CreateTableUserRole1650964896354 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user_role\` (
          \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
          \`role_name\` varchar(10) NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`user_role\``);
    }
}
exports.CreateTableUserRole1650964896354 = CreateTableUserRole1650964896354;
//# sourceMappingURL=1650964896354-CreateTableUserRole.js.map