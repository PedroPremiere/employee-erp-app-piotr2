/*
 * @group show
 * @group user
 * @group userShow
 */

import { conf } from '@/config';
import { get } from '@test/methods/get';
import { RoutesEnum } from '@/types/enums/Routes.enum';
import { noFoundAssertion } from '@test/assertion/noFound';
import { noPasswordAssertion } from '@test/assertion/noPassword';
import { UserFactory } from '@/db/factories/UserFactory';

const url = `/${conf.api.prefix}/${RoutesEnum.USERS}`;

describe('Index User Controller (e2e)', () => {
    describe(`${url} (GET)`, () => {
        it('Returns user DATA', async () => {
            const user = await UserFactory.create();

            const { status, body } = await get({ url: `${url}/${user.id}` });

            expect(status).toBe(200);

            expect(body).toEqual(
                expect.objectContaining({
                    id: user.id,
                    email: user.email
                })
            );

            noPasswordAssertion(body);
        });

        it('Returns NO FOUND sending NON EXISTING USER ID', async () => {
            await UserFactory.create();

            const { status, body } = await get({ url: `${url}/WrongId` });

            noFoundAssertion(status, body);
        });
    });
});
