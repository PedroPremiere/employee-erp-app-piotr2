/*
 * @group show
 * @group contract
 * @group showContract
 */

import * as dayjs from 'dayjs';

import { graphQlQuery } from '@test/methods/graphQlQuery';
import { UserFactory } from '@/apps/User/factories/UserFactory';
import { ContractsFactory } from '@/db/factories/ContractsFactory';

const operation = 'contract';
const fields = [
    'id',
    'ownerId',
    'position',
    'vacationDays',
    'vacationDaysPerYear',
    {
        user: ['id']
    }
];

describe('Show CONTRACT', () => {
    it('Returns contract DATA', async () => {
        const user = await UserFactory.create();
        const contract = await ContractsFactory.create(user.id);

        const { status, body } = await graphQlQuery({
            operation,
            variables: { id: { value: contract.id, required: true } },
            fields
        });

        const { data } = body;

        expect(status).toBe(200);

        expect(data.contract).toEqual(
            expect.objectContaining({
                id: contract.id,
                position: contract.position,
                vacationDaysPerYear: contract.vacationDaysPerYear,
                vacationDays: contract.vacationDays,
                ownerId: user.id,
                user: { id: user.id }
            })
        );

        dayjs(body.startDate).isSame(contract.startDate, 'day');
        dayjs(body.endDate).isSame(contract.endDate, 'day');
    });

    it('Returns NO FOUND sending NON EXISTING CONTRACT ID', async () => {
        const { status, body } = await graphQlQuery({
            operation,
            variables: { id: { value: 'WrongId', required: true } },
            fields,
            lang: 'pl'
        });

        expect(status).toBe(200);

        const expectedDialog = i18nService.__({
            phrase: 'Not Found',
            locale: 'pl'
        });

        expect(body.errors[0].message).toBe(expectedDialog);
    });
});
