import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableOrderDetail1650964848678 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`order_detail\` (
          \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
          \`order_id\` bigint unsigned NOT NULL,
          \`product_code\` varchar(255) NOT NULL,
          \`quantity_order\` int unsigned NOT NULL,
          \`customer_id\` bigint unsigned NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`order_detail\``);
  }
}
