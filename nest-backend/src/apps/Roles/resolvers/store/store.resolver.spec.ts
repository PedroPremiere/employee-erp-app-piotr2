/*
 * @group store
 * @group role
 * @group roleStore
 */

import { post } from '@test/methods/post';
import { RoleFactory } from '@/db/factories/RoleFactory';

const url = `/graphql`;
const operation = 'storeRole';

describe('Store Role Controller (e2e)', () => {
    describe(`${url} (GET)`, () => {
        it('Creates new Role sending CORRECT DATA', async () => {
            const role = RoleFactory.generate();

            const payload = graph.mutation({
                operation,
                variables: {
                    name: { value: role.name, required: true }
                },
                fields: ['id', 'createdAt', 'updatedAt']
            });

            const { status, body } = await post({ url, payload });

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
            const payload = graph.mutation({
                operation,
                variables: {},
                fields: ['id', 'createdAt', 'updatedAt']
            });

            const { status, body } = await post({
                url,
                payload
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

            const payload = graph.mutation({
                operation,
                variables: {},
                fields: ['id', 'createdAt', 'updatedAt']
            });

            const { status, body } = await post({
                url: `${url}?lang=${lang}`,
                payload
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
});
