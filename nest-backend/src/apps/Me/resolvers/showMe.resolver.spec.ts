/*
 * @group me
 * @group profile
 * @group user
 * @group userProfile
 */

import { conf } from '@/project/config';
import { post } from '@test/methods/post';
import { RoutesEnum } from '@/project/types/enums/Routes.enum';
import { UserFactory } from '@/apps/User/factories/UserFactory';
import { noPasswordAssertion } from '@test/assertion/noPassword';

let user;
let token;

const url = '/graphql';
const loginUrl = `/${conf.api.prefix}/${RoutesEnum.LOGIN}`;

describe('User Profile', () => {
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
            const payload = graph.query({
                operation: 'me',
                fields: [
                    'id',
                    'email',
                    'createdAt',
                    'updatedAt',
                    { contracts: ['id'] }
                ]
            });

            const { status, body } = await post({
                url,
                payload,
                token
            });

            expect(status).toBe(200);

            const { data } = body;

            expect(data.me).toEqual(
                expect.objectContaining({
                    id: user.id,
                    email: user.email,
                    contracts: []
                })
            );
        });

        it('Returns Unauthorized as Not Logged in', async () => {
            const payload = graph.query({
                operation: 'me',
                fields: [
                    'id',
                    'email',
                    'createdAt',
                    'updatedAt',
                    { contracts: ['id'] }
                ]
            });

            const { status, body } = await post({
                url,
                payload
            });

            expect(status).toBe(200);

            expect(body.errors[0].message).toBe(
                i18nService.translate('errors.unauthorized')
            );
        });

        it('Returns Unauthorized as Not Logged in, in selected language', async () => {
            const payload = graph.query({
                operation: 'me',
                fields: [
                    'id',
                    'email',
                    'createdAt',
                    'updatedAt',
                    { contracts: ['id'] }
                ]
            });

            const { status, body } = await post({
                url: `${url}?lang=pl`,
                payload
            });

            expect(status).toBe(200);

            expect(body.errors[0].message).toBe(
                i18nService.translate('errors.unauthorized', { lang: 'pl' })
            );
        });
    });
});
