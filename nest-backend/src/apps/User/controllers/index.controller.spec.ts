/*
 * @group index
 * @group user
 * @group userIndex
 */

import { conf } from '@/project/config';
import { get } from '@test/methods/get';
import { RoutesEnum } from '@/project/types/enums/Routes.enum';
import { emptyListAssertion } from '@test/assertion/emptyList';
import { noPasswordAssertion } from '@test/assertion/noPassword';
import { UserFactory } from '@/apps/User/factories/UserFactory';

const url = `/${conf.api.prefix}/${RoutesEnum.USERS}`;

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
                const user = await UserFactory.create();
                users.push(user);
            }

            const { status, body } = await get({ url });

            expect(status).toBe(200);

            /*todo maybe add meta and pagination
            const { data, meta } = body;

             */
            const data = body;

            //const { totalItems } = meta;

            for (const user of users) {
                expect(data).toContainEqual(
                    expect.objectContaining({
                        id: user.id,
                        email: user.email
                    })
                );
            }
            /*
                        expect(totalItems).toEqual(data.length);
                        expect(totalItems).toEqual(expectedCount);

             */

            for (const item of data) {
                noPasswordAssertion(item);
            }
        });
    });
});