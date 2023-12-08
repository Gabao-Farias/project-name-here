import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701978858131 implements MigrationInterface {
    name = 'Migration1701978858131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "machine_state_values" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" json NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_5984597a7260969cd85e1ad800c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "machineStateValuesId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_728e09393b46bb882570faa84ba" UNIQUE ("machineStateValuesId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_728e09393b46bb882570faa84ba" FOREIGN KEY ("machineStateValuesId") REFERENCES "machine_state_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_728e09393b46bb882570faa84ba"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_728e09393b46bb882570faa84ba"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "machineStateValuesId"`);
        await queryRunner.query(`DROP TABLE "machine_state_values"`);
    }

}
