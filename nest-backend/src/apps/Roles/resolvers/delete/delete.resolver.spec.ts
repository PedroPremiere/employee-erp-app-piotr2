/*
 * @group delete
 * @group role
 * @group roleDelete
 */

import { RoleFactory } from '@/db/factories/RoleFactory';
import { graphQlMutation } from '@test/methods/graphQlMutation';

const operation = 'deleteRole';
const fields = ['message'];

describe('Delete User', () => {
    it('Deletes when payload ok', async () => {
        const role = await RoleFactory.create();

        const { status, body } = await graphQlMutation({
            operation,
            fields,
            variables: { id: { value: role.id, required: true } }
        });

        const { data } = body;

        expect(status).toBe(200);

        const expectedDialog = i18nService.__({
            phrase: 'DELETED',
            locale: 'en'
        });

        expect(data[operation]).toEqual(
            expect.objectContaining({
                message: expectedDialog
            })
        );
        const userAfterDelete = await prismaService.contract.findFirst({
            where: { id: role.id }
        });

        expect(userAfterDelete).toBeFalsy();
    });

    it('Deletes when payload ok, message in selected language', async () => {
        const role = await RoleFactory.create();

        const { status, body } = await graphQlMutation({
            operation,
            fields,
            variables: { id: { value: role.id, required: true } },
            lang: 'pl'
        });

        const { data } = body;
        expect(status).toBe(200);

        const expectedDialog = i18nService.__({
            phrase: 'DELETED',
            locale: 'pl'
        });

        expect(data[operation]).toEqual(
            expect.objectContaining({
                message: expectedDialog
            })
        );

        const userAfterDelete = await prismaService.contract.findFirst({
            where: { id: role.id }
        });

        expect(userAfterDelete).toBeFalsy();
    });

    it('Returns NO FOUND sending NON EXISTING ID', async () => {
        const { status, body } = await graphQlMutation({
            operation,
            fields,
            variables: { id: { value: 'not existing id', required: true } }
        });

        expect(status).toBe(200);

        const expectedDialog = i18nService.__({
            phrase: 'Not Found',
            locale: 'en'
        });

        expect(body.errors[0].message).toBe(expectedDialog);
    });

    it('Returns NO FOUND sending NON EXISTING ID', async () => {
        const { status, body } = await graphQlMutation({
            operation,
            fields,
            variables: { id: { value: 'not existing id', required: true } },
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
