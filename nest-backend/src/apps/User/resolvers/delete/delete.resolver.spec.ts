/*
 * @group delete
 * @group user
 * @group userDelete
 */

import { UserFactory } from '@/apps/User/factories/UserFactory';
import { graphQlMutation } from '@test/methods/graphQlMutation';

const operation = 'deleteUser';
const fields = ['message'];

describe('Delete User', () => {
    it('Deletes user when payload ok', async () => {
        const user = await UserFactory.create();

        const { status, body } = await graphQlMutation({
            operation,
            fields,
            variables: { id: { value: user.id, required: true } }
        });

        const { data } = body;
        expect(status).toBe(200);

        const expectedDialog = i18nService.__({
            phrase: 'DELETED',
            locale: 'en'
        });

        expect(data.deleteUser).toEqual(
            expect.objectContaining({
                message: expectedDialog
            })
        );

        const userAfterDelete = await prismaService.user.findFirst({
            where: { id: user.id }
        });

        expect(userAfterDelete).toBeFalsy();
    });

    it('Deletes user when payload ok, message in selected language', async () => {
        const user = await UserFactory.create();

        const { status, body } = await graphQlMutation({
            operation,
            fields,
            variables: { id: { value: user.id, required: true } },
            lang: 'pl'
        });

        const { data } = body;
        expect(status).toBe(200);

        const expectedDialog = i18nService.__({
            phrase: 'DELETED',
            locale: 'pl'
        });

        expect(data.deleteUser).toEqual(
            expect.objectContaining({
                message: expectedDialog
            })
        );

        const userAfterDelete = await prismaService.user.findFirst({
            where: { id: user.id }
        });

        expect(userAfterDelete).toBeFalsy();
    });

    it('Returns NO FOUND sending NON EXISTING USER ID', async () => {
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

    it('Returns NO FOUND sending NON EXISTING USER ID in Selected Language', async () => {
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
