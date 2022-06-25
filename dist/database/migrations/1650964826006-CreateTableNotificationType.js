"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableNotificationType1650964826006 = void 0;
class CreateTableNotificationType1650964826006 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`notification_type\` (
          \`id\` int unsigned NOT NULL AUTO_INCREMENT,
          \`notification_name\` varchar(255) NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`notification_type\``);
    }
}
exports.CreateTableNotificationType1650964826006 = CreateTableNotificationType1650964826006;
//# sourceMappingURL=1650964826006-CreateTableNotificationType.js.map