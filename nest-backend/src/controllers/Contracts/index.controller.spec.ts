import * as dayjs from 'dayjs';

import { conf } from '@/config';
import { get } from '@test/methods/get';
import { Routes } from '@/types/enums/Routes';
import { UsersFactory } from '@test/factories/user.factory';
import { emptyListAssertion } from '@test/assertion/emptyList';
import { ContractsFactory } from '@test/factories/contracts.factory';

const url = `/${conf.api.prefix}/${Routes.CONTRACTS}`;

const expectedCount = 10;
const contracts = [];

describe('Index Contracts Controller (e2e)', () => {
    describe(`${url} (GET)`, () => {
        it('Returns empty list when NO DATA', async () => {
            const { status, body } = await get({ url });

            emptyListAssertion(status, body);
        });

        it('Returns list of users', async () => {
            const user = await UsersFactory.create();

            for (let i = 0; i < expectedCount; i++) {
                const contract = await ContractsFactory.create(user);

                contracts.push(contract);
            }

            const { status, body } = await get({ url });

            expect(status).toBe(200);

            const { data, count } = body;

            for (const contract of contracts) {
                expect(data).toContainEqual(
                    expect.objectContaining({
                        id: contract.id,
                        vacationDaysPerYear: contract.vacationDaysPerYear,
                        vacationDays: contract.vacationDays,
                        position: contract.position
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

            expect(count).toEqual(data.length);
            expect(count).toEqual(expectedCount);
        });
    });
});
