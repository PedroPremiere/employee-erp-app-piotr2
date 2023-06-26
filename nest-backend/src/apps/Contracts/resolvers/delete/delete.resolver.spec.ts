/*
 * @group delete
 * @group contract
 * @group contractDelete
 */

import { UserFactory } from '@/apps/User/factories/UserFactory';
import { ContractsFactory } from '@/db/factories/ContractsFactory';
import { graphQlMutation } from '@test/methods/graphQlMutation';

const operation = 'deleteContract';
const fields = ['message'];

describe('Delete User', () => {
    it('Deletes when payload ok', async () => {
        const user = await UserFactory.create();
        const contract = await ContractsFactory.create(user.id);

        const { status, body } = await graphQlMutation({
            operation,
            fields,
            variables: { id: { value: contract.id, required: true } }
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
            where: { id: user.id }
        });

        expect(userAfterDelete).toBeFalsy();
    });

    it('Deletes when payload ok, message in selected language', async () => {
        const user = await UserFactory.create();
        const contract = await ContractsFactory.create(user.id);

        const { status, body } = await graphQlMutation({
            operation,
            fields,
            variables: { id: { value: contract.id, required: true } },
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
            where: { id: user.id }
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

    it('Returns NO FOUND sending NON EXISTING ID in Selected Language', async () => {
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
