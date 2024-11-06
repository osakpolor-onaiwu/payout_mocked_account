import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1730288544205 implements MigrationInterface {
    name = 'Default1730288544205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "merchant_balance" ("id" SERIAL NOT NULL, "balance_before" double precision NOT NULL DEFAULT '0', "balance_after" double precision NOT NULL DEFAULT '0', "amount" double precision NOT NULL DEFAULT '0', "f4b_account_id" integer NOT NULL, "meta" json, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "merchantBankDetailId" integer, CONSTRAINT "PK_f8c111393cce0d0c14b3fb5d3a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d6240bde978ea5f1137fd3018a" ON "merchant_balance" ("f4b_account_id") `);
        await queryRunner.query(`CREATE TABLE "merchant_bank_details" ("id" SERIAL NOT NULL, "bank_code" character varying NOT NULL, "bank_name" character varying NOT NULL, "f4b_account_id" integer NOT NULL, "nuban" character varying NOT NULL, "meta" json, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_e86d7cdfded443bde35ee4b2802" UNIQUE ("f4b_account_id"), CONSTRAINT "PK_e56e802234d5841ace83c42f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e86d7cdfded443bde35ee4b280" ON "merchant_bank_details" ("f4b_account_id") `);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "business_name" character varying NOT NULL, "f4b_account_id" integer NOT NULL, "parent_account_id" integer NOT NULL DEFAULT '1', "meta" json, "role" character varying NOT NULL DEFAULT 'owner', "password" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "bankDetailId" integer, CONSTRAINT "UQ_31cb30ce2fe38ce1e8e87785591" UNIQUE ("business_name"), CONSTRAINT "REL_39ffcf2da96b7109a4f2244ed8" UNIQUE ("bankDetailId"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d5f0431655c7548d3124e36fac" ON "account" ("f4b_account_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7a28b097b684d9bdb0cd2771a7" ON "account" ("parent_account_id", "f4b_account_id") `);
        await queryRunner.query(`ALTER TABLE "merchant_balance" ADD CONSTRAINT "FK_fc9538739bab0e1c9911fc5d079" FOREIGN KEY ("merchantBankDetailId") REFERENCES "merchant_bank_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_39ffcf2da96b7109a4f2244ed89" FOREIGN KEY ("bankDetailId") REFERENCES "merchant_bank_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_39ffcf2da96b7109a4f2244ed89"`);
        await queryRunner.query(`ALTER TABLE "merchant_balance" DROP CONSTRAINT "FK_fc9538739bab0e1c9911fc5d079"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7a28b097b684d9bdb0cd2771a7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d5f0431655c7548d3124e36fac"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e86d7cdfded443bde35ee4b280"`);
        await queryRunner.query(`DROP TABLE "merchant_bank_details"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d6240bde978ea5f1137fd3018a"`);
        await queryRunner.query(`DROP TABLE "merchant_balance"`);
    }

}
