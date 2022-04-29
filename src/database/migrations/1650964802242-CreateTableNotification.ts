import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableNotification1650964802242
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`notification\` (
        \`id\` bigint unsigned NOT NULL AUTO_INCREMENT,
        \`title\` varchar(255) NOT NULL,
        \`parcel_code\` varchar(255) NOT NULL,
        \`receiver_id\` bigint unsigned NOT NULL,
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`transferring_code\` varchar(255) NOT NULL,
        \`transferring_method_id\` int unsigned NOT NULL,
        \`notification_type_id\` int unsigned NOT NULL,
        \`image\` varchar(1000) NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`notification\``);
  }
}
