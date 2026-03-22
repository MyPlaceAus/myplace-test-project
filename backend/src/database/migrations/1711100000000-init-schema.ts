import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1711100000000 implements MigrationInterface {
  name = 'InitSchema1711100000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
        "email" varchar NOT NULL,
        "name" text,
        "organization" text,
        "isOnboarded" boolean NOT NULL DEFAULT (0),
        CONSTRAINT "UQ_users_email" UNIQUE ("email")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "projects" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
        "title" varchar NOT NULL,
        "image" varchar NOT NULL,
        "user" integer,
        CONSTRAINT "FK_projects_user" FOREIGN KEY ("user") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
