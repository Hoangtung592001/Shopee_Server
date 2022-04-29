import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUserRole1650964896354 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`user_role\` (
          \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
          \`role_name\` varchar(10) NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user_role\``);
  }
}
