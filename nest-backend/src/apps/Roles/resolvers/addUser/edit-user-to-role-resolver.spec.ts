/*
 * @group update
 * @group Role
 * @group updateRole
 * @group addUserToRole
 */

import { faker } from '@faker-js/faker';

import { limits } from '@/project/config/limits';
import { RoleFactory } from '@/db/factories/RoleFactory';
import { graphQlMutation } from '@test/methods/graphQlMutation';
import { UserFactory } from '@/apps/User/factories/UserFactory';

const operation = 'addUserToRole';

const fields = ['message'];
const userCount = 50;
const roleCount = 50;

describe('Update Role (e2e)', () => {
    it('Updates Role sending CORRECT DATA', async () => {
        const users = [];
        const roles = [];

        for (let i = 0; i < userCount; i++) {
            const user = await UserFactory.create();

            users.push(user.id);
        }

        for (let i = 0; i < roleCount; i++) {
            const role = await RoleFactory.create();

            roles.push(role.id);
        }

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                userIds: { value: users, type: '[String!]' },
                roleIds: { value: roles, type: '[String!]' }
            },
            fields
        });

        expect(status).toBe(200);

        const { data } = body;

        expect(data[operation].message).toBe('ok');

        for (const role of roles) {
            const usersOfRoleInDb = await prismaService.role
                .findFirst({
                    where: { id: role.id }
                })
                .users();

            for (const user of usersOfRoleInDb) {
                expect(users).toContainEqual(user.id);
            }
        }
    });

    it('Returns Bad Request sending NON EXISTING IDS', async () => {
        const users = [];
        const roles = [];

        for (let i = 0; i < userCount; i++) {
            users.push(faker.git.commitSha());
        }

        for (let i = 0; i < roleCount; i++) {
            roles.push(faker.git.commitSha());
        }

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                userIds: { value: users, type: '[String!]' },
                roleIds: { value: roles, type: '[String!]' }
            },
            fields
        });

        expect(status).toBe(200);

        const { errors } = body.errors[0];

        const expectedDialogUser = i18nService.__({
            phrase: 'userDoesntExist',
            locale: 'en'
        });

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'userIds',
                messages: expect.arrayContaining([expectedDialogUser])
            })
        );

        const expectedDialogRole = i18nService.__({
            phrase: 'roleDoesntExist',
            locale: 'en'
        });

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'roleIds',
                messages: expect.arrayContaining([expectedDialogRole])
            })
        );
    });

    it('Returns Bad Request sending NON EXISTING IDS in selected Language', async () => {
        const users = [];
        const roles = [];
        const lang = 'pl';

        for (let i = 0; i < userCount; i++) {
            users.push(faker.git.commitSha());
        }

        for (let i = 0; i < roleCount; i++) {
            roles.push(faker.git.commitSha());
        }

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                userIds: { value: users, type: '[String!]' },
                roleIds: { value: roles, type: '[String!]' }
            },
            fields,
            lang
        });

        expect(status).toBe(200);

        const { errors } = body.errors[0];

        const expectedDialogUser = i18nService.__({
            phrase: 'userDoesntExist',
            locale: lang
        });

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'userIds',
                messages: expect.arrayContaining([expectedDialogUser])
            })
        );

        const expectedDialogRole = i18nService.__({
            phrase: 'roleDoesntExist',
            locale: lang
        });

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'roleIds',
                messages: expect.arrayContaining([expectedDialogRole])
            })
        );
    });

    it('Returns Bad Request sending NO DATA in selected Language', async () => {
        const users = [];
        const roles = [];
        const lang = 'pl';

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                userIds: { value: users, type: '[String!]' },
                roleIds: { value: roles, type: '[String!]' }
            },
            fields,
            lang
        });

        expect(status).toBe(200);

        const { errors } = body.errors[0];

        const expectedDialogUser = i18nService.__({
            phrase: 'userDoesntExist',
            locale: lang
        });

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'userIds',
                messages: expect.arrayContaining([expectedDialogUser])
            })
        );

        const expectedDialogRole = i18nService.__({
            phrase: 'roleDoesntExist',
            locale: lang
        });

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'roleIds',
                messages: expect.arrayContaining([expectedDialogRole])
            })
        );
    });

    it('Returns Bad Request sending TOO MUCH DATA in selected Language', async () => {
        const users = [];
        const roles = [];
        const lang = 'pl';

        for (let i = 0; i < limits.maxInputArraySize + 1; i++) {
            const user = await UserFactory.create();

            users.push(user.id);
        }

        for (let i = 0; i < limits.maxInputArraySize + 1; i++) {
            const role = await RoleFactory.create();

            roles.push(role.id);
        }

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                userIds: { value: users, type: '[String!]' },
                roleIds: { value: roles, type: '[String!]' }
            },
            fields,
            lang
        });

        expect(status).toBe(200);

        const { errors } = body.errors[0];

        const expectedDialogUser = i18nService.__({
            phrase: 'tooManyItems',
            locale: lang
        });

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'userIds',
                messages: expect.arrayContaining([expectedDialogUser])
            })
        );

        const expectedDialogRole = i18nService.__({
            phrase: 'tooManyItems',
            locale: lang
        });

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'roleIds',
                messages: expect.arrayContaining([expectedDialogRole])
            })
        );
    });
});
