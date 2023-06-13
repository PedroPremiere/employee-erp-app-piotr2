/*
 * @group show
 * @group contract
 * @group showContract
 */

import * as dayjs from 'dayjs';

import { UserFactory } from '@/apps/User/factories/UserFactory';
import { ContractsFactory } from '@/db/factories/ContractsFactory';
import { post } from '@test/methods/post';

const url = `/graphql`;

describe('Show CONTRACT', () => {
    describe(`${url} (GET) Contract`, () => {
        it('Returns contract DATA', async () => {
            const user = await UserFactory.create();
            const contract = await ContractsFactory.create(user.id);

            const payload = graph.query({
                operation: 'contract',
                variables: { id: { value: contract.id, required: true } },
                fields: [
                    'id',
                    'ownerId',
                    'position',
                    'vacationDays',
                    'vacationDaysPerYear',
                    {
                        user: ['id']
                    }
                ]
            });

            const { status, body } = await post({
                url,
                payload
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
            const user = await UserFactory.create();
            const contract = await ContractsFactory.create(user.id);

            const payload = graph.query({
                operation: 'contract',
                variables: { id: { value: 'WrongId', required: true } },
                fields: [
                    'id',
                    'ownerId',
                    'position',
                    'vacationDays',
                    'vacationDaysPerYear',
                    {
                        user: ['id']
                    }
                ]
            });

            const { status, body } = await post({
                url,
                payload
            });

            expect(status).toBe(200);

            expect(body.errors[0].message).toBe(
                i18nService.translate('errors.notFound')
            );
        });
    });
});
