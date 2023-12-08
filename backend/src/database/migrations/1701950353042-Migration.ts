import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701950353042 implements MigrationInterface {
    name = 'Migration1701950353042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "assembly_lines" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "alignment_accuracy" real, "speed" real, "fitting_tolerance" real, "belt_speed" real, CONSTRAINT "PK_8b144c4bf44c858c82144560336" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quality_control_station" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "camera_calibration" real, "light_intensity" real, "software_version" text, "criteria_settings" real, CONSTRAINT "PK_e795743cb6eb9f53e87c8c933bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "welding" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "error_rate" real, "vibration_level" real, "electrode_wear" real, "shielding_pressure" real, "wire_feed_rate" real, "arc_stability" real, "seam_width" real, "cooling_efficiency" real, CONSTRAINT "PK_af1180f2669171f7d384f4766de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "machine_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "weldingId" uuid, "paitingStationId" uuid, "assemblyLineId" uuid, "qualityControlId" uuid, CONSTRAINT "REL_eda8bb83c4e25adbbe403b8375" UNIQUE ("weldingId"), CONSTRAINT "REL_0b2d32204ea1a6722480b3ef53" UNIQUE ("paitingStationId"), CONSTRAINT "REL_79460eb940689216a05f777599" UNIQUE ("assemblyLineId"), CONSTRAINT "REL_af735312747a1381f7b150e0d1" UNIQUE ("qualityControlId"), CONSTRAINT "PK_4745c15c6c0446b17fe45038433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "painting_station" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "flow_rate" real, "pressure" real, "color_consistency" real, "nozzle_condition" real, CONSTRAINT "PK_09325e3bfff8ab2fd3032a7dff9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "machine_history" ADD CONSTRAINT "FK_eda8bb83c4e25adbbe403b83756" FOREIGN KEY ("weldingId") REFERENCES "welding"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "machine_history" ADD CONSTRAINT "FK_0b2d32204ea1a6722480b3ef535" FOREIGN KEY ("paitingStationId") REFERENCES "painting_station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "machine_history" ADD CONSTRAINT "FK_79460eb940689216a05f7775995" FOREIGN KEY ("assemblyLineId") REFERENCES "assembly_lines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "machine_history" ADD CONSTRAINT "FK_af735312747a1381f7b150e0d1b" FOREIGN KEY ("qualityControlId") REFERENCES "quality_control_station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "machine_history" DROP CONSTRAINT "FK_af735312747a1381f7b150e0d1b"`);
        await queryRunner.query(`ALTER TABLE "machine_history" DROP CONSTRAINT "FK_79460eb940689216a05f7775995"`);
        await queryRunner.query(`ALTER TABLE "machine_history" DROP CONSTRAINT "FK_0b2d32204ea1a6722480b3ef535"`);
        await queryRunner.query(`ALTER TABLE "machine_history" DROP CONSTRAINT "FK_eda8bb83c4e25adbbe403b83756"`);
        await queryRunner.query(`DROP TABLE "painting_station"`);
        await queryRunner.query(`DROP TABLE "machine_history"`);
        await queryRunner.query(`DROP TABLE "welding"`);
        await queryRunner.query(`DROP TABLE "quality_control_station"`);
        await queryRunner.query(`DROP TABLE "assembly_lines"`);
    }

}
