/*
 * @group delete
 * @group user
 * @group userDelete
 */

import { post } from '@test/methods/post';
import { UserFactory } from '@/apps/User/factories/UserFactory';

const url = `/graphql`;

describe('Delete User', () => {
    describe(`${url} DELETE user`, () => {
        it('Deletes user when payload ok', async () => {
            const user = await UserFactory.create();

            const payload = graph.mutation({
                operation: 'deleteUser',
                fields: ['message'],
                variables: { id: { value: user.id, required: true } }
            });

            const { status, body } = await post({ url, payload });

            const { data } = body;
            expect(status).toBe(200);

            expect(data.deleteUser).toEqual(
                expect.objectContaining({
                    message: i18nService.translate('messages.DELETED')
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
                operation: 'deleteUser',
                fields: ['message'],
                variables: { id: { value: user.id, required: true } }
            });

            const { status, body } = await post({
                url: `${url}?lang=pl`,
                payload
            });

            const { data } = body;
            expect(status).toBe(200);

            expect(data.deleteUser).toEqual(
                expect.objectContaining({
                    message: i18nService.translate('messages.DELETED', {
                        lang: 'pl'
                    })
                })
            );

            const userAfterDelete = await prismaService.user.findFirst({
                where: { id: user.id }
            });

            expect(userAfterDelete).toBeFalsy();
        });

        it('Returns NO FOUND sending NON EXISTING USER ID', async () => {
            const payload = graph.mutation({
                operation: 'deleteUser',
                fields: ['message'],
                variables: { id: { value: 'not existing id', required: true } }
            });

            const { status, body } = await post({ url, payload });

            expect(status).toBe(200);

            expect(body.errors[0].message).toBe(
                i18nService.translate('errors.notFound')
            );
        });
    });
});
