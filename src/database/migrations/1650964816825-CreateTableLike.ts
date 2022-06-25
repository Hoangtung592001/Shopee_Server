import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableLike1650964816825 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`like\` (
                \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
                \`member_id\` bigint unsigned NOT NULL,
                \`productCode\` int unsigned NOT NULL,
                \`status\` int unsigned NOT NULL DEFAULT '1' COMMENT '0: Inactive, 1: active',
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
              ) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`like\``);
  }
}
