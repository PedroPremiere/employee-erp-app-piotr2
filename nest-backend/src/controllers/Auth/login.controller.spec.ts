import { post } from '@test/methods/post';
import { Routes } from '@/types/enums/Routes';
import { UsersFactory } from '@test/factories/user.factory';
import { unAuthorizedAssertion } from '@test/assertion/unAuthorized';
import { conf } from '@/config';

const url = `/${conf.api.prefix}/${Routes.LOGIN}`;

describe('Login Controller (e2e)', () => {
    describe(`${url} (POST)`, () => {
        it('Returns OK sending CORRECT DATA', async () => {
            const user = await UsersFactory.create();

            const payload = { email: user.email, password: user.password };

            const { status, body } = await post({ url, payload });

            expect(status).toBe(200);

            expect(body.access_token).toBeTruthy();

            expect(body.user).toEqual(
                expect.objectContaining({
                    email: user.email,
                    id: user.id
                })
            );
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
            const user = await UsersFactory.create();

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
