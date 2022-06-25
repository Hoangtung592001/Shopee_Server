import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTransferringMethod1650964887398
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`transferring_method\` (
          \`id\` int unsigned NOT NULL AUTO_INCREMENT,
          \`method_name\` varchar(255) NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`transferring_method\``);
  }
}
