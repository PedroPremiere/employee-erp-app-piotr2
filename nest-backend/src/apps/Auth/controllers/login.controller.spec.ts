/*
 * @group login
 * @group auth
 * @group user
 */

import { conf } from '@/project/config';
import { post } from '@test/methods/post';
import { UserFactory } from '@/apps/User/factories/UserFactory';
import { RoutesEnum } from '@/project/types/enums/Routes.enum';
import { noPasswordAssertion } from '@test/assertion/noPassword';
import { unAuthorizedAssertion } from '@test/assertion/unAuthorized';

const url = `/${conf.api.prefix}/${RoutesEnum.LOGIN}`;

describe('Login Controller (e2e)', () => {
    describe(`${url} (POST)`, () => {
        it('Returns OK sending CORRECT DATA', async () => {
            const userData = UserFactory.generate();
            const user = await UserFactory.create(userData);

            const payload = {
                email: userData.email,
                password: userData.password
            };

            const { status, body } = await post({ url, payload });

            expect(status).toBe(200);

            expect(body.access_token).toBeTruthy();

            expect(body.user).toEqual(
                expect.objectContaining({
                    email: user.email,
                    id: user.id
                })
            );

            noPasswordAssertion(body);
            noPasswordAssertion(body.user);
        });

        it('Returns Unauthorized sending WRONG DATA', async () => {
            const payload = {
                email: 'wrong@email.com',
                password: 'wrong password'
            };

            const { status, body } = await post({ url, payload });

            unAuthorizedAssertion(status, body);
        });

        it('Returns Unauthorized sending WRONG PASSWORD', async () => {
            const user = await UserFactory.create();

            const payload = { email: user.email, password: 'wrong password' };

            const { status, body } = await post({ url, payload });

            unAuthorizedAssertion(status, body);
        });

        it('Returns Unauthorized sending NO DATA', async () => {
            const { status, body } = await post({ url });

            unAuthorizedAssertion(status, body);
        });
    });
});
