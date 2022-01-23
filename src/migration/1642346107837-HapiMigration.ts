import {MigrationInterface, QueryRunner} from "typeorm";

export class HapiMigration1642346107837 implements MigrationInterface {

    name = 'HapiMigration1642346107837';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "columns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL DEFAULT 'column title', "order" integer NOT NULL DEFAULT '1', "boardId" uuid, CONSTRAINT "PK_4ac339ccbbfed1dcd96812abbd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "boards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) DEFAULT 'BOARD', CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(64) NOT NULL DEFAULT 'username', "login" character varying(64) NOT NULL DEFAULT 'userlogin', "password" character varying(64) NOT NULL DEFAULT 'P@55w0rd', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL DEFAULT 'TASK', "order" integer NOT NULL DEFAULT '1', "description" character varying(255) NOT NULL DEFAULT 'TASK DESCRIPTION', "userId" uuid DEFAULT '5c131706-971e-4639-8921-28f204d2a145', "boardId" uuid DEFAULT 'cbc4d613-64d0-46ca-ab86-b73c95874a7f', "columnId" character varying DEFAULT '5371d27d-7e49-4a8e-bb42-b716010d152e', CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "columns" ADD CONSTRAINT "FK_ac92bfd7ba33174aabef610f361" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_8a75fdea98c72c539a0879cb0d1" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_8a75fdea98c72c539a0879cb0d1"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP CONSTRAINT "FK_ac92bfd7ba33174aabef610f361"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "boards"`);
        await queryRunner.query(`DROP TABLE "columns"`);
    }

}
