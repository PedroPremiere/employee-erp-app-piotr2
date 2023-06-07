import {
    Table,
    QueryRunner,
    TableForeignKey,
    MigrationInterface
} from 'typeorm';

export class CreateContracts1684930215299 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'contracts',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid'
                    },

                    {
                        name: 'position',
                        type: 'varchar'
                    },

                    {
                        name: 'startDate',
                        type: 'timestamp',
                        default: 'now()'
                    },

                    {
                        name: 'endDate',
                        type: 'timestamp',
                        default: 'now()'
                    },

                    {
                        name: 'userId',
                        type: 'varchar'
                    },

                    {
                        name: 'vacationDaysPerYear',
                        type: 'int'
                    },

                    {
                        name: 'vacationDays',
                        type: 'int'
                    },

                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ['userId'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id']
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('contracts');
    }
}
