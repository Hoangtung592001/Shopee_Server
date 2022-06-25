"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableProductLine1650964859721 = void 0;
class CreateTableProductLine1650964859721 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`product_line\` (
          \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
          \`product_line\` varchar(255) NOT NULL,
          \`text_description\` varchar(1000) NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`product_line\``);
    }
}
exports.CreateTableProductLine1650964859721 = CreateTableProductLine1650964859721;
//# sourceMappingURL=1650964859721-CreateTableProductLine.js.map