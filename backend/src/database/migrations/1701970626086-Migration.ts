import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701970626086 implements MigrationInterface {
    name = 'Migration1701970626086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "machine_history" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "machine_history" DROP COLUMN "created_at"`);
    }

}
