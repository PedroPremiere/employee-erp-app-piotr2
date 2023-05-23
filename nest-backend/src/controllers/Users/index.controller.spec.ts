import { conf } from '@/config';
import { get } from '@test/methods/get';
import { Routes } from '@/types/enums/Routes';
import { UsersFactory } from '@test/factories/user.factory';
import { emptyListAssertion } from '@test/assertion/emptyList';
import { noPasswordAssertion } from '@test/assertion/noPassword';

const url = `/${conf.api.prefix}/${Routes.USERS}`;

describe('Index User Controller (e2e)', () => {
    describe(`${url} (GET)`, () => {
        it('Returns empty list when NO DATA', async () => {
            const { status, body } = await get({ url });

            emptyListAssertion(status, body);
        });

        it('Returns list of users', async () => {
            const user = await UsersFactory.create();

            const { status, body } = await get({ url });

            expect(status).toBe(200);
            expect(body).toContainEqual(
                expect.objectContaining({
                    id: user.id,
                    email: user.email
                })
            );

            for (const item of body) {
                noPasswordAssertion(item);
            }
        });
    });
});
