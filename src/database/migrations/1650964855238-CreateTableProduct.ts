import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProduct1650964855238 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`product\` (
          \`id\` int NOT NULL AUTO_INCREMENT,
          \`product_name\` varchar(255) NOT NULL,
          \`product_line\` int NOT NULL,
          \`quantity_in_stock\` bigint unsigned NOT NULL,
          \`price_each\` double unsigned NOT NULL,
          \`image\` varchar(10000) NOT NULL,
          \`origin\` varchar(255) NOT NULL,
          \`discount\` double NOT NULL,
          \`sold_quantity\` bigint unsigned NOT NULL,
          \`shop_type_id\` int unsigned NOT NULL DEFAULT '1',
          \`seller_id\` int unsigned NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`product\``);
  }
}
