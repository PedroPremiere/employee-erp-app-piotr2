/*
 * @group index
 * @group contract
 * @group contractIndex
 */

import * as dayjs from 'dayjs';

import { conf } from '@/config';
import { get } from '@test/methods/get';
import { UserFactory } from '@/db/factories/UserFactory';
import { RoutesEnum } from '@/types/enums/Routes.enum';
import { emptyListAssertion } from '@test/assertion/emptyList';
import { ContractsFactory } from '@/db/factories/ContractsFactory';

const url = `/${conf.api.prefix}/${RoutesEnum.CONTRACTS}`;

const expectedCount = 10;
const contracts = [];

describe('Index Contracts Controller (e2e)', () => {
    describe(`${url} (GET)`, () => {
        it('Returns empty list when NO DATA', async () => {
            const { status, body } = await get({ url });

            emptyListAssertion(status, body);
        });

        it('Returns list of users', async () => {
            const user = await UserFactory.create();

            for (let i = 0; i < expectedCount; i++) {
                const contract = await ContractsFactory.create(user.id);

                contracts.push(contract);
            }

            const { status, body } = await get({ url });

            expect(status).toBe(200);
            /*
                        const { data, meta } = body;

             */

            const data = body;

            for (const contract of contracts) {
                expect(data).toContainEqual(
                    expect.objectContaining({
                        id: contract.id,
                        vacationDaysPerYear: contract.vacationDaysPerYear,
                        vacationDays: contract.vacationDays,
                        position: contract.position,
                        ownerId: user.id
                    })
                );

                let selectedContract = data.filter(
                    item => item.id === contract.id
                );

                expect(selectedContract.length).toBe(1);

                selectedContract = selectedContract[0];

                dayjs(selectedContract.startDate).isSame(
                    contract.startDate,
                    'day'
                );
                dayjs(selectedContract.endDate).isSame(contract.endDate, 'day');
            }
            /*
                        expect(meta.totalItems).toEqual(data.length);
                        expect(meta.totalItems).toEqual(expectedCount);

             */
        });
    });
});
