/*
 * @group store
 * @group role
 * @group roleStore
 */

import { conf } from '@/config';
import { post } from '@test/methods/post';
import { RoutesEnum } from '@/types/enums/Routes.enum';
import { UsersFactory } from '@test/factories/user.factory';
import { RolesFactory } from '@test/factories/roles.factory';
import { badRequestAssertion } from '@test/assertion/badRequest';

const url = `/${conf.api.prefix}/${RoutesEnum.ROLES}`;

//todo many changes here
describe('Index User Controller (e2e)', () => {
    describe(`${url} (GET)`, () => {
        it('Creates new USER sending CORRECT DATA', async () => {
            const user = await UsersFactory.create();
            const role = RolesFactory.generate([user.id]);

            const payload = role;

            const { status, body } = await post({ url, payload });

            expect(status).toBe(201);

            expect(body).toEqual(
                expect.objectContaining({
                    name: role.name,
                    users: [expect.objectContaining({ id: user.id })]
                })
            );
        });

        it('Creates new USER sending CORRECT DATA without USERS', async () => {
            const role = RolesFactory.generate();

            const payload = role;

            const { status, body } = await post({ url, payload });

            expect(status).toBe(201);

            expect(body).toEqual(
                expect.objectContaining({
                    name: role.name
                })
            );
        });

        it('BAD REQUEST when NO DATA', async () => {
            const { status, body } = await post({ url });

            const expectedMessage = [
                {
                    error: [i18nService.translate('errors.notEmpty')].join(
                        ', '
                    ),
                    field: 'name'
                }
            ];

            badRequestAssertion(status, body, expectedMessage);
        });
    });
});
