import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701786641879 implements MigrationInterface {
    name = 'Migration1701786641879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
