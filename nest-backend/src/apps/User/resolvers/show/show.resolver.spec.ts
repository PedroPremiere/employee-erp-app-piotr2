/*
 * @group show
 * @group user
 * @group userShow
 */

import { post } from '@test/methods/post';
import { UserFactory } from '@/apps/User/factories/UserFactory';
import { noPasswordAssertion } from '@test/assertion/noPassword';

const url = `/graphql`;

describe('Show User', () => {
    describe(`${url} (GET) User`, () => {
        it('Returns user DATA sending correct data', async () => {
            const user = await UserFactory.create();

            const payload = graph.query({
                operation: 'user',
                variables: { id: { value: user.id, required: true } },
                fields: [
                    'id',
                    'email',
                    {
                        contracts: ['id']
                    }
                ]
            });

            const { status, body } = await post({ url, payload });

            const { data } = body;

            expect(status).toBe(200);

            expect(data.user).toEqual(
                expect.objectContaining({
                    id: user.id,
                    email: user.email
                })
            );

            noPasswordAssertion(body);
        });

        it('Returns NO FOUND sending NON EXISTING USER ID', async () => {
            const payload = graph.query({
                operation: 'user',
                variables: { id: { value: 'wrongId', required: true } },
                fields: ['id', 'email']
            });

            const { status, body } = await post({ url, payload });

            expect(status).toBe(200);

            const expectedDialog = i18nService.__({
                phrase: 'Not Found',
                locale: 'en'
            });

            expect(body.errors[0].message).toBe(expectedDialog);
        });

        it('Returns NO FOUND sending NON EXISTING USER ID in SELECTED LANGUAGE', async () => {
            const payload = graph.query({
                operation: 'user',
                variables: { id: { value: 'wrongId', required: true } },
                fields: ['id', 'email']
            });

            const { status, body } = await post({
                url: `${url}?lang=pl`,
                payload
            });
            expect(status).toBe(200);

            const expectedDialog = i18nService.__({
                phrase: 'Not Found',
                locale: 'pl'
            });

            expect(body.errors[0].message).toBe(expectedDialog);
        });
    });
});
