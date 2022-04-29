import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableJudge1650964741768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`judge\` (
            \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
            \`member_id\` bigint unsigned NOT NULL,
            \`productCode\` int unsigned NOT NULL,
            \`content\` varchar(5000) NOT NULL,
            \`status\` int unsigned NOT NULL DEFAULT '1' COMMENT '0: Inactive, 1: active',
            \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            PRIMARY KEY (\`id\`)
          )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`judge\``);
  }
}
