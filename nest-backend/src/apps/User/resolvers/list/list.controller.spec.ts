/*
 * @group index
 * @group user
 * @group userIndex
 */

import { graphQlQuery } from '@test/methods/graphQlQuery';
import { UserFactory } from '@/apps/User/factories/UserFactory';
import { ContractsFactory } from '@/db/factories/ContractsFactory';
import { paginationPageIsStringBadRequest } from '@test/commonTests/PaginationErrors/PageIsString';
import { paginationPageIsNegativeBadRequest } from '@test/commonTests/PaginationErrors/NegativePage';
import { wrongSortableFieldBadRequest } from '@test/commonTests/PaginationErrors/WrongSortableField';

const expectedCount = 20;
const fields = [
    'id',
    'email',
    {
        contracts: ['id']
    }
];
const operation = 'listUsers';

async function seed() {
    const users = [];

    for (let i = 0; i < expectedCount; i++) {
        const user = await UserFactory.create();
        const contract = await ContractsFactory.create(user.id);

        users.unshift({ user, contracts: [contract] });
    }

    return users;
}

describe('Index User Controller (e2e)', () => {
    it('Returns empty list when NO DATA', async () => {
        const { status, body } = await graphQlQuery({
            operation,
            fields
        });

        const { data } = body;

        expect(status).toBe(200);
        expect(data.listUsers).toEqual([]);
    });

    it('Returns list of users', async () => {
        const users = await seed();

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

        for (const user of users) {
            expect(data.listUsers).toContainEqual(
                expect.objectContaining({
                    id: user.user.id,
                    email: user.user.email,
                    contracts: expect.arrayContaining([
                        { id: user.contracts[0].id }
                    ])
                })
            );
        }
    });

    it('Returns list of users Paginated (page 1)', async () => {
        const perPage = 10;
        const page = 1;

        const users = await seed();

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

        for (const user of users.slice(perPage * (page - 1), perPage * page)) {
            expect(data.listUsers).toContainEqual(
                expect.objectContaining({
                    id: user.user.id,
                    email: user.user.email,
                    contracts: expect.arrayContaining([
                        { id: user.contracts[0].id }
                    ])
                })
            );
        }
    });

    it('Returns list of users Paginated (last page)', async () => {
        const perPage = 10;
        const page = 2;

        const users = await seed();

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

        for (const user of users.slice(perPage * (page - 1), perPage * page)) {
            expect(data.listUsers).toContainEqual(
                expect.objectContaining({
                    id: user.user.id,
                    email: user.user.email,
                    contracts: expect.arrayContaining([
                        { id: user.contracts[0].id }
                    ])
                })
            );
        }
    });

    it('Returns Bad Request when wrong Sortable Field', async () => {
        wrongSortableFieldBadRequest({
            operation,
            fields
        });
    });

    it('Returns Bad Request when negative Page and PerPage', async () => {
        paginationPageIsNegativeBadRequest({
            operation,
            fields
        });
    });

    it('Bad Request when Page and PerPage are string', async () => {
        paginationPageIsStringBadRequest({ operation, fields });
    });
});
