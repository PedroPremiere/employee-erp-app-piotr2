import * as dayjs from 'dayjs';

import { conf } from '@/config';
import { get } from '@test/methods/get';
import { Routes } from '@/types/enums/Routes';
import { noFoundAssertion } from '@test/assertion/noFound';
import { UsersFactory } from '@test/factories/user.factory';
import { ContractsFactory } from '@test/factories/contracts.factory';

const url = `/${conf.api.prefix}/${Routes.CONTRACTS}`;

describe('Index CONTRACT Controller (e2e)', () => {
    describe(`${url} (GET)`, () => {
        it('Returns user DATA', async () => {
            const user = await UsersFactory.create();
            const contract = await ContractsFactory.create(user);

            const { status, body } = await get({
                url: `${url}/${contract.id}`
            });

            expect(status).toBe(200);

            expect(body).toEqual(
                expect.objectContaining({
                    id: contract.id,
                    position: contract.position,
                    vacationDaysPerYear: contract.vacationDaysPerYear,
                    vacationDays: contract.vacationDays,
                    user: {
                        id: contract.user.id
                    }
                })
            );

            dayjs(body.startDate).isSame(contract.startDate, 'day');
            dayjs(body.endDate).isSame(contract.endDate, 'day');
        });

        it('Returns NO FOUND sending NON EXISTING CONTRACT ID', async () => {
            const user = await UsersFactory.create();
            const contract = await ContractsFactory.create(user);

            const { status, body } = await get({ url: `${url}/WrongId` });

            noFoundAssertion(status, body);
        });
    });
});
