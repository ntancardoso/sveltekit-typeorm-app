import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1732024396713 implements MigrationInterface {
    name = 'Migration1732024396713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying(50) DEFAULT 'system', "modified_on" TIMESTAMP NOT NULL DEFAULT now(), "modified_by" character varying(50) DEFAULT 'system', "deleted_on" TIMESTAMP, "deleted_by" character varying(50), "group_name" character varying(100) NOT NULL, CONSTRAINT "UQ_96a5a3483559c780044edb366ee" UNIQUE ("group_name"), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_group" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying(50) DEFAULT 'system', "modified_on" TIMESTAMP NOT NULL DEFAULT now(), "modified_by" character varying(50) DEFAULT 'system', "deleted_on" TIMESTAMP, "deleted_by" character varying(50), "user_id" integer, "group_id" integer, CONSTRAINT "PK_3c29fba6fe013ec8724378ce7c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying(50) DEFAULT 'system', "modified_on" TIMESTAMP NOT NULL DEFAULT now(), "modified_by" character varying(50) DEFAULT 'system', "deleted_on" TIMESTAMP, "deleted_by" character varying(50), "username" character varying(50) NOT NULL, "email" character varying(100), "first_name" character varying(150), "last_name" character varying(150), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD CONSTRAINT "FK_7ded8f984bbc2ee6ff0beee491b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD CONSTRAINT "FK_bb9982562cca83afb76c0ddc0d6" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_group" DROP CONSTRAINT "FK_bb9982562cca83afb76c0ddc0d6"`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP CONSTRAINT "FK_7ded8f984bbc2ee6ff0beee491b"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_group"`);
        await queryRunner.query(`DROP TABLE "group"`);
    }

}
