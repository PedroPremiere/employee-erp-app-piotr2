/*
 * @group update
 * @group User
 * @group updateUser
 */

import { translate } from '@test/helpers/translate';
import { UserFactory } from '@/apps/User/factories/UserFactory';
import { graphQlMutation } from '@test/methods/graphQlMutation';

const operation = 'updateUser';
const fields = ['id', 'createdAt', 'updatedAt', 'email'];

describe('Update User (e2e)', () => {
    it('Updates User sending CORRECT DATA', async () => {
        const user = await UserFactory.create();
        const newUserData = UserFactory.generate();

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                id: {
                    value: user.id,
                    required: true
                },
                email: { value: newUserData.email, required: true }
            },
            fields
        });

        const { data } = body;

        expect(status).toBe(200);

        const roleInDb = await prismaService.user.findFirst({
            where: { id: data[operation].id }
        });

        expect(roleInDb).toEqual(
            expect.objectContaining({
                id: data[operation].id,
                email: newUserData.email
            })
        );

        expect(data[operation]).toEqual(
            expect.objectContaining({
                id: roleInDb.id
            })
        );
    });

    it('Returns NO FOUND sending NON EXISTING  ID', async () => {
        const newUserData = UserFactory.generate();

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                id: {
                    value: 'non existing id',
                    required: true
                },
                email: { value: newUserData.email, required: true }
            },
            fields
        });

        expect(status).toBe(200);

        const expectedDialog = i18nService.__({
            phrase: 'Not Found',
            locale: 'en'
        });

        expect(body.errors[0].message).toBe(expectedDialog);
    });

    it('Returns NO FOUND sending NON EXISTING  ID, in selected language', async () => {
        const newUserData = UserFactory.generate();

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                id: {
                    value: 'non existing id',
                    required: true
                },
                email: { value: newUserData.email, required: true }
            },
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

    it('BAD REQUEST when NoData', async () => {
        const { status, body } = await graphQlMutation({
            operation,
            variables: {},
            fields
        });

        expect(status).toBe(200);

        const { errors } = body.errors[0];

        const expectedDialog = [translate('notEmpty', 'en')];

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'id',
                messages: expect.arrayContaining(expectedDialog)
            })
        );
    });
});
