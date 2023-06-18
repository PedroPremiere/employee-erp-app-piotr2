/*
 * @group delete
 * @group contract
 * @group contractDelete
 */

import { post } from '@test/methods/post';
import { UserFactory } from '@/apps/User/factories/UserFactory';
import { ContractsFactory } from '@/db/factories/ContractsFactory';

const url = `/graphql`;
const operation = 'deleteContract';

describe('Delete User', () => {
    describe(`${url} DELETE contract`, () => {
        it('Deletes when payload ok', async () => {
            const user = await UserFactory.create();
            const contract = await ContractsFactory.create(user.id);

            const payload = graph.mutation({
                operation,
                fields: ['message'],
                variables: { id: { value: contract.id, required: true } }
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
                where: { id: user.id }
            });

            expect(userAfterDelete).toBeFalsy();
        });

        it('Deletes when payload ok, message in selected language', async () => {
            const user = await UserFactory.create();
            const contract = await ContractsFactory.create(user.id);

            const payload = graph.mutation({
                operation,
                fields: ['message'],
                variables: { id: { value: contract.id, required: true } }
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
                where: { id: user.id }
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

        it('Returns NO FOUND sending NON EXISTING ID in Selected Language', async () => {
            const payload = graph.mutation({
                operation,
                fields: ['message'],
                variables: { id: { value: 'not existing id', required: true } }
            });

            const { status, body } = await post({ url, payload });

            expect(status).toBe(200);

            const expectedDialog = i18nService.__({
                phrase: 'Not Found',
                locale: 'pl'
            });

            expect(body.errors[0].message).toBe(expectedDialog);
        });
    });
});
