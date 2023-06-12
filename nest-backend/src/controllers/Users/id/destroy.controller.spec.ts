/*
 * @group delete
 * @group user
 * @group userDelete
 */
import { conf } from '@/config';
import { RoutesEnum } from '@/types/enums/Routes.enum';
import { destroy } from '@test/methods/destroy';
import { deletedAssertion } from '@test/assertion/deleted';
import { noFoundAssertion } from '@test/assertion/noFound';
import { UserFactory } from '@/db/factories/UserFactory';

const url = `/${conf.api.prefix}/${RoutesEnum.USERS}`;

describe('Delete User Controller (e2e)', () => {
    describe(`${url}/:id (DELETE)`, () => {
        it('Deletes user', async () => {
            const user = await UserFactory.create();

            const { status, body } = await destroy({
                url: `${url}/${user.id}`
            });

            deletedAssertion(status, body);
        });

        it('Returns NO FOUND sending NON EXISTING USER ID', async () => {
            await UserFactory.create();

            const { status, body } = await destroy({
                url: `${url}/WrongId`
            });

            noFoundAssertion(status, body);
        });
    });
});
