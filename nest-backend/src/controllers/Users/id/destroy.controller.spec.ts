import { conf } from '@/config';
import { Routes } from '@/types/enums/Routes';
import { destroy } from '@test/methods/destroy';
import { deletedAssertion } from '@test/assertion/deleted';
import { noFoundAssertion } from '@test/assertion/noFound';
import { UsersFactory } from '@test/factories/user.factory';

const url = `/${conf.api.prefix}/${Routes.USERS}`;

describe('Delete User Controller (e2e)', () => {
    describe(`${url}/:id (DELETE)`, () => {
        it('Deletes user', async () => {
            const user = await UsersFactory.create();

            const { status, body } = await destroy({
                url: `${url}/${user.id}`
            });

            deletedAssertion(status, body);
        });

        it('Returns NO FOUND sending NON EXISTING USER ID', async () => {
            await UsersFactory.create();

            const { status, body } = await destroy({
                url: `${url}/WrongId`
            });

            noFoundAssertion(status, body);
        });
    });
});
