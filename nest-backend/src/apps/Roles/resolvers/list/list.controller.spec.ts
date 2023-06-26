/*
 * @group index
 * @group role
 * @group roleIndex
 */

import { RoleFactory } from '@/db/factories/RoleFactory';
import { graphQlQuery } from '@test/methods/graphQlQuery';
import { UserFactory } from '@/apps/User/factories/UserFactory';
import { paginationPageIsStringBadRequest } from '@test/commonTests/PaginationErrors/PageIsString';
import { paginationPageIsNegativeBadRequest } from '@test/commonTests/PaginationErrors/NegativePage';
import { wrongSortableFieldBadRequest } from '@test/commonTests/PaginationErrors/WrongSortableField';

const expectedCount = 10;

const fields = ['id', 'name', 'createdAt', 'updatedAt', { users: ['id'] }];
const operation = 'listRoles';

async function seed() {
    const roles = [];

    for (let i = 0; i < expectedCount; i++) {
        const user = await UserFactory.create();
        const role = await RoleFactory.create([user.id]);

        roles.unshift({ ...role, users: [user] });
    }

    return roles;
}

describe('Index Contracts Controller (e2e)', () => {
    it('Returns empty list when NO DATA', async () => {
        const { status, body } = await graphQlQuery({
            operation,
            fields: ['id']
        });

        const { data } = body;

        expect(status).toBe(200);
        expect(data[operation]).toEqual([]);
    });
    it('Returns list of users', async () => {
        const roles = await seed();

        const { status, body } = await graphQlQuery({
            operation,
            variables: {
                page: { value: 1 },
                perPage: { value: 20 }
            },
            fields
        });

        const { data } = body;

        expect(status).toBe(200);

        for (const role of roles) {
            expect(data[operation]).toContainEqual(
                expect.objectContaining({
                    id: role.id,
                    name: role.name,
                    users: [{ id: role.users[0].id }]
                })
            );
        }
    });

    it('Returns list of users Paginated (page 1)', async () => {
        const perPage = 10;
        const page = 1;

        const roles = await seed();

        const { status, body } = await graphQlQuery({
            operation,
            variables: {
                page: { value: 1 },
                perPage: { value: perPage }
            },
            fields
        });

        const { data } = body;

        expect(status).toBe(200);

        for (const role of roles.slice(perPage * (page - 1), perPage * page)) {
            expect(data[operation]).toContainEqual(
                expect.objectContaining({
                    id: role.id,
                    name: role.name,
                    users: [{ id: role.users[0].id }]
                })
            );
        }
    });

    it('Returns list of users Paginated (last page)', async () => {
        const perPage = 10;
        const page = 2;

        const roles = await seed();

        const { status, body } = await graphQlQuery({
            operation,
            variables: {
                page: { value: 2 },
                perPage: { value: perPage }
            },
            fields
        });

        const { data } = body;

        expect(status).toBe(200);

        for (const role of roles.slice(perPage * (page - 1), perPage * page)) {
            expect(data[operation]).toContainEqual(
                expect.objectContaining({
                    id: role.id,
                    name: role.name,
                    users: [{ id: role.users[0].id }]
                })
            );
        }
    });

    it('Returns Bad Request when wrong Sortable Field', async () => {
        await wrongSortableFieldBadRequest({
            operation,
            fields
        });
    });

    it('Bad Request when negative Page and PerPage', async () => {
        await paginationPageIsNegativeBadRequest({
            operation,
            fields
        });
    });

    it('Bad Request when Page and PerPage are string', async () => {
        await paginationPageIsStringBadRequest({
            operation,
            fields
        });
    });
});
