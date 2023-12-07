import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701969262187 implements MigrationInterface {
    name = 'Migration1701969262187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "machine_history" ADD "machineHealthId" uuid`);
        await queryRunner.query(`ALTER TABLE "machine_history" ADD CONSTRAINT "UQ_33e439be9b44a4b26427cdd0c4a" UNIQUE ("machineHealthId")`);
        await queryRunner.query(`ALTER TABLE "machine_history" ADD CONSTRAINT "FK_33e439be9b44a4b26427cdd0c4a" FOREIGN KEY ("machineHealthId") REFERENCES "machine_health"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "machine_history" DROP CONSTRAINT "FK_33e439be9b44a4b26427cdd0c4a"`);
        await queryRunner.query(`ALTER TABLE "machine_history" DROP CONSTRAINT "UQ_33e439be9b44a4b26427cdd0c4a"`);
        await queryRunner.query(`ALTER TABLE "machine_history" DROP COLUMN "machineHealthId"`);
    }

}
