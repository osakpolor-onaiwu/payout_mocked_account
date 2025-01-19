import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1733788648399 implements MigrationInterface {
  name = "Default1733788648399";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cron_registry" ("id" uuid NOT NULL, "worker" character varying NOT NULL, "cron_setting" jsonb NOT NULL, "worker_data" jsonb, "started" boolean NOT NULL DEFAULT false, "stopped" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_167c2c733135e00ba6df402bf02" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4f2a7847b29f52785ff8907c45" ON "cron_registry" ("id", "started", "stopped") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4f2a7847b29f52785ff8907c45"`
    );
    await queryRunner.query(`DROP TABLE "cron_registry"`);
  }
}
