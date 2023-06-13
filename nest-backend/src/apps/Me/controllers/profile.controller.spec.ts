/*
 * @group me
 * @group profile
 * @group user
 * @group userProfile
 */

import { conf } from '@/project/config';
import { get } from '@test/methods/get';
import { post } from '@test/methods/post';
import { UserFactory } from '@/apps/User/factories/UserFactory';
import { RoutesEnum } from '@/project/types/enums/Routes.enum';
import { unAuthorizedAssertion } from '@test/assertion/unAuthorized';
import { noPasswordAssertion } from '@test/assertion/noPassword';

let user;
let token;

const url = `/${conf.api.prefix}/${RoutesEnum.ME}`;
const loginUrl = `/${conf.api.prefix}/${RoutesEnum.LOGIN}`;

describe('User Profile Controller (e2e)', () => {
    beforeAll(async () => {
        const userData = UserFactory.generate();
        user = await UserFactory.create(userData);

        const payload = { email: user.email, password: userData.password };

        const { status, body } = await post({ url: loginUrl, payload });

        expect(status).toBe(200);

        token = body.access_token;

        noPasswordAssertion(body);
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
