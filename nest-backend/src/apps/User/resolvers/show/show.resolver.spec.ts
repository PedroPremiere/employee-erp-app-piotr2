/*
 * @group show
 * @group user
 * @group userShow
 */

import { graphQlQuery } from '@test/methods/graphQlQuery';
import { UserFactory } from '@/apps/User/factories/UserFactory';
import { noPasswordAssertion } from '@test/assertion/noPassword';

const operation = 'user';
const fields = [
    'id',
    'email',
    {
        contracts: ['id']
    }
];

describe('Show User', () => {
    it('Returns user DATA sending correct data', async () => {
        const user = await UserFactory.create();

        const { status, body } = await graphQlQuery({
            operation,
            variables: { id: { value: user.id, required: true } },
            fields
        });

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
        const { status, body } = await graphQlQuery({
            operation,
            variables: { id: { value: 'wrongId', required: true } },
            fields
        });

        expect(status).toBe(200);

        const expectedDialog = i18nService.__({
            phrase: 'Not Found',
            locale: 'en'
        });

        expect(body.errors[0].message).toBe(expectedDialog);
    });

    it('Returns NO FOUND sending NON EXISTING USER ID in SELECTED LANGUAGE', async () => {
        const { status, body } = await graphQlQuery({
            operation,
            variables: { id: { value: 'wrongId', required: true } },
            fields,
            lang: 'pl'
        });

        expect(status).toBe(200);

        const expectedDialog = i18nService.__({
            phrase: 'Not Found',
            locale: 'pl'
        });

        expect(body.errors[0].message).toBe(expectedDialog);
    });
});
