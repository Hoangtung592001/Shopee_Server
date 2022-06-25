import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableNotificationType1650964826006
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`notification_type\` (
          \`id\` int unsigned NOT NULL AUTO_INCREMENT,
          \`notification_name\` varchar(255) NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`notification_type\``);
  }
}
