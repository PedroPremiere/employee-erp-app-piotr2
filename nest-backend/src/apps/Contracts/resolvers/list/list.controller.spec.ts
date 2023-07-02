/*
 * @group index
 * @group contract
 * @group contractIndex
 */

import { UserFactory } from '@/apps/User/factories/UserFactory';
import { ContractsFactory } from '@/db/factories/ContractsFactory';

import { graphQlQuery } from '@test/methods/graphQlQuery';
import { paginationPageIsStringBadRequest } from '@test/commonTests/PaginationErrors/PageIsString';
import { paginationPageIsNegativeBadRequest } from '@test/commonTests/PaginationErrors/NegativePage';
import { wrongSortableFieldBadRequest } from '@test/commonTests/PaginationErrors/WrongSortableField';
import { truncate } from '@test/helpers/truncate';

const expectedCount = 10;

const fields = ['id', 'position', 'vacationDaysPerYear', 'vacationDays'];
const operation = 'listContracts';

async function seed() {
    const contracts = [];

    for (let i = 0; i < expectedCount; i++) {
        const user = await UserFactory.create();
        const contract = await ContractsFactory.create(user.id);

        contracts.unshift(contract);
    }

    return contracts;
}

describe('Index Contracts Controller (e2e)', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('Returns list of users', async () => {
        const contracts = await seed();

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

        for (const contract of contracts) {
            expect(data.listContracts).toContainEqual(
                expect.objectContaining({
                    id: contract.id,
                    position: contract.position,
                    vacationDaysPerYear: contract.vacationDaysPerYear,
                    vacationDays: contract.vacationDays
                })
            );
        }
    });

    it('Returns list of users Paginated (page 1)', async () => {
        const perPage = 10;
        const page = 1;

        const contracts = await seed();

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

        for (const contract of contracts.slice(
            perPage * (page - 1),
            perPage * page
        )) {
            expect(data.listContracts).toContainEqual(
                expect.objectContaining({
                    id: contract.id,
                    position: contract.position,
                    vacationDaysPerYear: contract.vacationDaysPerYear,
                    vacationDays: contract.vacationDays
                })
            );
        }
    });

    it('Returns list of users Paginated (last page)', async () => {
        const perPage = 10;
        const page = 2;

        const contracts = await seed();

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

        for (const contract of contracts.slice(
            perPage * (page - 1),
            perPage * page
        )) {
            expect(data.listContracts).toContainEqual(
                expect.objectContaining({
                    id: contract.id,
                    position: contract.position,
                    vacationDaysPerYear: contract.vacationDaysPerYear,
                    vacationDays: contract.vacationDays
                })
            );
        }
    });

    it('Returns empty list when NO DATA', async () => {
        const { status, body } = await graphQlQuery({
            operation,
            fields: ['id']
        });

        const { data } = body;

        expect(status).toBe(200);
        expect(data.listContracts).toEqual([]);
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

    it('Returns Bad Request when Page and PerPage as string', async () => {
        paginationPageIsStringBadRequest({
            operation,
            fields
        });
    });
});
