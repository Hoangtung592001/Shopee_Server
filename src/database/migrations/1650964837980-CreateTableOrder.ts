import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableOrder1650964837980 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`order\` (
          \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
          \`ordered_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          \`shipped_date\` datetime NOT NULL,
          \`comment\` varchar(1000) DEFAULT NULL,
          \`address\` varchar(1000) NOT NULL,
          \`customer_id\` bigint unsigned NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`order\``);
  }
}
