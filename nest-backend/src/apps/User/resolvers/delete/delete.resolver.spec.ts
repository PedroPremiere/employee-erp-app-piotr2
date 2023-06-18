/*
 * @group delete
 * @group user
 * @group userDelete
 */

import { post } from '@test/methods/post';
import { UserFactory } from '@/apps/User/factories/UserFactory';

const url = `/graphql`;
const operation = 'deleteUser';

describe('Delete User', () => {
    describe(`${url} DELETE user`, () => {
        it('Deletes user when payload ok', async () => {
            const user = await UserFactory.create();

            const payload = graph.mutation({
                operation,
                fields: ['message'],
                variables: { id: { value: user.id, required: true } }
            });

            const { status, body } = await post({ url, payload });

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

            const payload = graph.mutation({
                operation,
                fields: ['message'],
                variables: { id: { value: user.id, required: true } }
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

        it('Returns NO FOUND sending NON EXISTING USER ID in Selected Language', async () => {
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
