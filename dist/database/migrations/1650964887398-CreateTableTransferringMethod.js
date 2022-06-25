"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableTransferringMethod1650964887398 = void 0;
class CreateTableTransferringMethod1650964887398 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`transferring_method\` (
          \`id\` int unsigned NOT NULL AUTO_INCREMENT,
          \`method_name\` varchar(255) NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`transferring_method\``);
    }
}
exports.CreateTableTransferringMethod1650964887398 = CreateTableTransferringMethod1650964887398;
//# sourceMappingURL=1650964887398-CreateTableTransferringMethod.js.map