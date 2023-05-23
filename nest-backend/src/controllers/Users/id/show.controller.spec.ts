import { conf } from '@/config';
import { get } from '@test/methods/get';
import { Routes } from '@/types/enums/Routes';
import { noFoundAssertion } from '@test/assertion/noFound';
import { UsersFactory } from '@test/factories/user.factory';
import { noPasswordAssertion } from '@test/assertion/noPassword';

const url = `/${conf.api.prefix}/${Routes.USERS}`;

describe('Index User Controller (e2e)', () => {
    describe(`${url} (GET)`, () => {
        it('Returns user DATA', async () => {
            const user = await UsersFactory.create();

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
            await UsersFactory.create();

            const { status, body } = await get({ url: `${url}/WrongId` });

            noFoundAssertion(status, body);
        });
    });
});
