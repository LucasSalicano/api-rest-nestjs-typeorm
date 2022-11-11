import { MigrationInterface, QueryRunner } from "typeorm"

export class CourseRefactoring1668129486447 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TALBLE "courses" RENAME COLUMN "name" TO "course"`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TALBLE "courses" RENAME COLUMN "course" TO "name"`
        )
    }

}
