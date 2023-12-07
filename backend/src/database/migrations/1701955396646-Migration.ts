import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701955396646 implements MigrationInterface {
    name = 'Migration1701955396646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "machine_score" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "welding" real, "painting_station" real, "assembly_line" real, "quality_control" real, CONSTRAINT "PK_d646846ea0932997c350a0f6034" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "machine_health" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "factory" real, "machineScoreId" uuid, CONSTRAINT "REL_95bf493ca671d901e999b251a3" UNIQUE ("machineScoreId"), CONSTRAINT "PK_d9c67db96d446733676a3df79d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "machine_health" ADD CONSTRAINT "FK_95bf493ca671d901e999b251a36" FOREIGN KEY ("machineScoreId") REFERENCES "machine_score"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "machine_health" DROP CONSTRAINT "FK_95bf493ca671d901e999b251a36"`);
        await queryRunner.query(`DROP TABLE "machine_health"`);
        await queryRunner.query(`DROP TABLE "machine_score"`);
    }

}
