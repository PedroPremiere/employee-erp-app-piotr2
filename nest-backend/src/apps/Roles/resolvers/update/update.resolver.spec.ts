/*
 * @group update
 * @group Role
 * @group updateRole
 */

import { translate } from '@test/helpers/translate';
import { RoleFactory } from '@/db/factories/RoleFactory';
import { graphQlMutation } from '@test/methods/graphQlMutation';

const operation = 'updateRole';

const fields = ['id', 'createdAt', 'updatedAt', 'name'];

describe('Update Role (e2e)', () => {
    it('Updates Role sending CORRECT DATA', async () => {
        const role = await RoleFactory.create();
        const newRoleData = RoleFactory.generate();

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                id: {
                    value: role.id,
                    required: true
                },
                name: { value: newRoleData.name, required: true }
            },
            fields
        });

        const { data } = body;

        expect(status).toBe(200);

        const roleInDb = await prismaService.role.findFirst({
            where: { id: data[operation].id }
        });

        expect(roleInDb).toEqual(
            expect.objectContaining({
                id: data[operation].id,
                name: newRoleData.name
            })
        );

        expect(data[operation]).toEqual(
            expect.objectContaining({
                id: roleInDb.id
            })
        );
    });

    it('Returns NO FOUND sending NON EXISTING CONTRACT ID', async () => {
        const newRoleData = RoleFactory.generate();

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                id: {
                    value: 'non existing id',
                    required: true
                },
                name: { value: newRoleData.name, required: true }
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

    it('Returns NO FOUND sending NON EXISTING CONTRACT ID, in selected language', async () => {
        const newRoleData = RoleFactory.generate();

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                id: {
                    value: 'non existing id',
                    required: true
                },
                name: { value: newRoleData.name, required: true }
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

    it('BAD REQUEST when NoData in Selected Language', async () => {
        const lang = 'pl';

        const { status, body } = await graphQlMutation({
            operation,
            variables: {},
            fields,
            lang
        });

        expect(status).toBe(200);

        const { errors } = body.errors[0];

        const expectedDialog = [translate('notEmpty', lang)];

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'id',
                messages: expect.arrayContaining(expectedDialog)
            })
        );
    });
});
