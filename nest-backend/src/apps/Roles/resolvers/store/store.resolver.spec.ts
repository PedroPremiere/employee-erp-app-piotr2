/*
 * @group store
 * @group role
 * @group roleStore
 */

import { RoleFactory } from '@/db/factories/RoleFactory';
import { graphQlMutation } from '@test/methods/graphQlMutation';

const operation = 'storeRole';
const fields = ['id', 'createdAt', 'updatedAt'];

describe('Store Role Controller (e2e)', () => {
    it('Creates new Role sending CORRECT DATA', async () => {
        const role = RoleFactory.generate();

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                name: { value: role.name, required: true }
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
                name: role.name
            })
        );

        expect(data[operation]).toEqual(
            expect.objectContaining({
                id: roleInDb.id
            })
        );
    });

    it('BAD REQUEST when NoData', async () => {
        const { status, body } = await graphQlMutation({
            operation,
            variables: {},
            fields
        });

        expect(status).toBe(200);

        const { errors } = body.errors[0];

        const expectedDialog = i18nService.__({
            phrase: 'notEmpty',
            locale: 'en'
        });

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'name',
                messages: expect.arrayContaining([expectedDialog])
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

        const expectedDialog = i18nService.__({
            phrase: 'notEmpty',
            locale: lang
        });

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'name',
                messages: expect.arrayContaining([expectedDialog])
            })
        );
    });
});
