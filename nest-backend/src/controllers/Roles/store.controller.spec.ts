/*
 * @group store
 * @group role
 * @group roleStore
 */

import { conf } from '@/config';
import { post } from '@test/methods/post';
import { RoutesEnum } from '@/types/enums/Routes.enum';
import { badRequestAssertion } from '@test/assertion/badRequest';
import { RoleFactory } from '@/db/factories/RoleFactory';

const url = `/${conf.api.prefix}/${RoutesEnum.ROLES}`;

describe('Index User Controller (e2e)', () => {
    describe(`${url} (GET)`, () => {
        it('Creates new USER sending CORRECT DATA', async () => {
            const role = RoleFactory.generate();

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
