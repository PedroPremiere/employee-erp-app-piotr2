/*
 * @group show
 * @group role
 * @group roleShow
 */

import { RoleFactory } from '@/db/factories/RoleFactory';
import { graphQlQuery } from '@test/methods/graphQlQuery';
import { noPasswordAssertion } from '@test/assertion/noPassword';

const operation = 'role';
const fields = [
    'id',
    'name',
    {
        users: ['id']
    }
];

describe('Show role', () => {
    it('Returns user DATA sending correct data', async () => {
        const role = await RoleFactory.create();

        const { status, body } = await graphQlQuery({
            operation,
            variables: { id: { value: role.id, required: true } },
            fields
        });

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
            fields: [
                'id',
                'name',
                {
                    users: ['id']
                }
            ],
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
