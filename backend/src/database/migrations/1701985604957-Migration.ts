import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701985604957 implements MigrationInterface {
    name = 'Migration1701985604957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "machine_health_state_values" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" json NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_110cd40848f832e2c2bf1a4ff02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "machineHealthStateValuesId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_5504693d379bffbb00e59ad71a2" UNIQUE ("machineHealthStateValuesId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5504693d379bffbb00e59ad71a2" FOREIGN KEY ("machineHealthStateValuesId") REFERENCES "machine_health_state_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5504693d379bffbb00e59ad71a2"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_5504693d379bffbb00e59ad71a2"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "machineHealthStateValuesId"`);
        await queryRunner.query(`DROP TABLE "machine_health_state_values"`);
    }

}
