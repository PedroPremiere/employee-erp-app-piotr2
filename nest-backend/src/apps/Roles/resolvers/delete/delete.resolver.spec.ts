/*
 * @group delete
 * @group role
 * @group roleDelete
 */

import { post } from '@test/methods/post';
import { RoleFactory } from '@/db/factories/RoleFactory';

const url = `/graphql`;
const operation = 'deleteRole';

describe('Delete User', () => {
    describe(`${url} DELETE contract`, () => {
        it('Deletes when payload ok', async () => {
            const role = await RoleFactory.create();

            const payload = graph.mutation({
                operation,
                fields: ['message'],
                variables: { id: { value: role.id, required: true } }
            });

            const { status, body } = await post({ url, payload });

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

            const payload = graph.mutation({
                operation,
                fields: ['message'],
                variables: { id: { value: role.id, required: true } }
            });

            const { status, body } = await post({
                url: `${url}?lang=pl`,
                payload
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
            const payload = graph.mutation({
                operation,
                fields: ['message'],
                variables: { id: { value: 'not existing id', required: true } }
            });

            const { status, body } = await post({ url, payload });

            expect(status).toBe(200);

            const expectedDialog = i18nService.__({
                phrase: 'Not Found',
                locale: 'en'
            });

            expect(body.errors[0].message).toBe(expectedDialog);
        });

        it('Returns NO FOUND sending NON EXISTING ID', async () => {
            const payload = graph.mutation({
                operation,
                fields: ['message'],
                variables: { id: { value: 'not existing id', required: true } }
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
