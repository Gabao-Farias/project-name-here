import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701951043648 implements MigrationInterface {
    name = 'Migration1701951043648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "machine_history" ADD "userIdUserId" uuid`);
        await queryRunner.query(`ALTER TABLE "machine_history" ADD CONSTRAINT "FK_548818f480877b412cc2146f143" FOREIGN KEY ("userIdUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "machine_history" DROP CONSTRAINT "FK_548818f480877b412cc2146f143"`);
        await queryRunner.query(`ALTER TABLE "machine_history" DROP COLUMN "userIdUserId"`);
    }

}
