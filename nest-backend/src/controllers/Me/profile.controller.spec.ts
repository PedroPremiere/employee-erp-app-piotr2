import { get } from '@test/methods/get';
import { post } from '@test/methods/post';
import { Routes } from '@/types/enums/Routes';
import { UsersFactory } from '@test/factories/user.factory';
import { unAuthorizedAssertion } from '@test/assertion/unAuthorized';

let user;
let token;

const url = `/api/${Routes.ME}`;
const loginUrl = `/api/${Routes.LOGIN}`;

describe('User Profile Controller (e2e)', () => {
    beforeAll(async () => {
        user = await UsersFactory.create();

        const payload = { email: user.email, password: user.password };

        const { status, body } = await post({ url: loginUrl, payload });

        expect(status).toBe(200);

        token = body.access_token;
    });

    describe(`${url} (GET)`, () => {
        it('Returns User Data as Logged in', async () => {
            const { status, body } = await get({ url, token });

            expect(status).toBe(200);

            expect(body.username).toEqual(user.email);
        });

        it('Returns Unauthorized as Not Logged in', async () => {
            const { status, body } = await get({ url });

            unAuthorizedAssertion(status, body);
        });
    });
});
