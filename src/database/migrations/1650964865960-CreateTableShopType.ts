import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableShopType1650964865960 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`shop_type\` (
          \`shop_type_id\` int unsigned NOT NULL AUTO_INCREMENT,
          \`shop_name\` varchar(255) NOT NULL,
          PRIMARY KEY (\`shop_type_id\`)
        ) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`shop_type\``);
  }
}
