import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProductLine1650964859721 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`product_line\` (
          \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
          \`product_line\` varchar(255) NOT NULL,
          \`text_description\` varchar(1000) NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`product_line\``);
  }
}
