/*
 * @group index
 * @group user
 * @group userIndex
 */

import { conf } from '@/config';
import { get } from '@test/methods/get';
import { Routes } from '@/types/enums/Routes';
import { UsersFactory } from '@test/factories/user.factory';
import { emptyListAssertion } from '@test/assertion/emptyList';
import { noPasswordAssertion } from '@test/assertion/noPassword';

const url = `/${conf.api.prefix}/${Routes.USERS}`;

const expectedCount = 10;
const users = [];

describe('Index User Controller (e2e)', () => {
    describe(`${url} (GET)`, () => {
        it('Returns empty list when NO DATA', async () => {
            const { status, body } = await get({ url });

            emptyListAssertion(status, body);
        });

        it('Returns list of users', async () => {
            for (let i = 0; i < expectedCount; i++) {
                const user = await UsersFactory.create();
                users.push(user);
            }

            const { status, body } = await get({ url });

            expect(status).toBe(200);

            const { data, count } = body;

            for (const user of users) {
                expect(data).toContainEqual(
                    expect.objectContaining({
                        id: user.id,
                        email: user.email
                    })
                );
            }

            expect(count).toEqual(data.length);
            expect(count).toEqual(expectedCount);

            for (const item of data) {
                noPasswordAssertion(item);
            }
        });
    });
});
