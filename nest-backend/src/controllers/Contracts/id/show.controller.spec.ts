/*
 * @group showContract
 */

import * as dayjs from 'dayjs';

import { conf } from '@/config';
import { get } from '@test/methods/get';
import { UserFactory } from '@/db/factories/UserFactory';
import { RoutesEnum } from '@/types/enums/Routes.enum';
import { noFoundAssertion } from '@test/assertion/noFound';
import { ContractsFactory } from '@/db/factories/ContractsFactory';

const url = `/${conf.api.prefix}/${RoutesEnum.CONTRACTS}`;

describe('Index CONTRACT Controller (e2e)', () => {
    describe(`${url} (GET)`, () => {
        it('Returns user DATA', async () => {
            const user = await UserFactory.create();
            const contract = await ContractsFactory.create(user.id);

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
                    ownerId: user.id
                })
            );

            dayjs(body.startDate).isSame(contract.startDate, 'day');
            dayjs(body.endDate).isSame(contract.endDate, 'day');
        });

        it('Returns NO FOUND sending NON EXISTING CONTRACT ID', async () => {
            const user = await UserFactory.create();
            const contract = await ContractsFactory.create(user.id);

            const { status, body } = await get({ url: `${url}/WrongId` });

            noFoundAssertion(status, body);
        });
    });
});
