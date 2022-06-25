import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableOrderCart1650964842416 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`orders_cart\` (
          \`order_id\` bigint unsigned NOT NULL AUTO_INCREMENT,
          \`product_code\` varchar(255) NOT NULL,
          \`quantity_order\` int unsigned NOT NULL,
          \`customer_id\` bigint unsigned NOT NULL,
          PRIMARY KEY (\`order_id\`)
        ) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`orders_cart\``);
  }
}
