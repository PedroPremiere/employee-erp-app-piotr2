import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserRoles1686051190430 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_roles',
                columns: [
                    /*todo :
                    here is problem with uuid primary key
                     */
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },

                    {
                        name: 'userId',
                        type: 'varchar'
                    },

                    {
                        name: 'roleId',
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
                ],
                foreignKeys: [
                    {
                        name: 'User',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['userId']
                    },
                    {
                        name: 'Role',
                        referencedTableName: 'roles',
                        referencedColumnNames: ['id'],
                        columnNames: ['roleId']
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_roles');
    }
}
