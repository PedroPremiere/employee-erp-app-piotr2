import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRole1686047549564 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'roles',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid'
                    },

                    {
                        name: 'name',
                        type: 'varchar'
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
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('roles');
    }
}
