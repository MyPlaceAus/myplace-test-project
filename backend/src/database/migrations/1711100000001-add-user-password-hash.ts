import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserPasswordHash1711100000001 implements MigrationInterface {
  name = 'AddUserPasswordHash1711100000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" ADD COLUMN "passwordHash" text',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "passwordHash"');
  }
}
