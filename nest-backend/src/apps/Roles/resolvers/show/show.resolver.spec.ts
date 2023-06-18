/*
 * @group show
 * @group role
 * @group roleShow
 */

import { post } from '@test/methods/post';
import { RoleFactory } from '@/db/factories/RoleFactory';
import { noPasswordAssertion } from '@test/assertion/noPassword';

const url = `/graphql`;
const operation = 'role';

describe('Show role', () => {
    describe(`${url} role`, () => {
        it('Returns user DATA sending correct data', async () => {
            const role = await RoleFactory.create();

            const payload = graph.query({
                operation,
                variables: { id: { value: role.id, required: true } },
                fields: ['id', 'name']
            });

            const { status, body } = await post({ url, payload });

            const { data } = body;

            expect(status).toBe(200);

            expect(data[operation]).toEqual(
                expect.objectContaining({
                    id: role.id,
                    name: role.name
                })
            );

            noPasswordAssertion(body);
        });

        it('Returns NO FOUND sending NON EXISTING  ID', async () => {
            const payload = graph.query({
                operation,
                variables: { id: { value: 'wrongId', required: true } },
                fields: [
                    'id',
                    'name',
                    {
                        users: ['id']
                    }
                ]
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
                operation,
                variables: { id: { value: 'wrongId', required: true } },
                fields: [
                    'id',
                    'name',
                    {
                        users: ['id']
                    }
                ]
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
