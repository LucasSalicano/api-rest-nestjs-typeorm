import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddTagsIdToCoursesTable1669247749702 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'courses_tags',
            new TableColumn({
                name: 'tagsId',
                type: 'uuid',
                isNullable: true
            })
        )

        await queryRunner.createForeignKey(
            'courses_tags',
            new TableForeignKey({
                name: 'courses_tags_fk',
                columnNames: ['tagsId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'tags'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('courses_tags', 'courses_tags_fk')
        await queryRunner.dropColumn('courses_tags', 'tagsId')
    }

}
