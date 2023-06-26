/*
 * @group store
 * @group user
 * @group userStore
 */

import { faker } from '@faker-js/faker';

import { conf } from '@/project/config';
import { UserFactory } from '@/apps/User/factories/UserFactory';
import { graphQlMutation } from '@test/methods/graphQlMutation';

//todo : formating message like __mf
const { minLength } = conf.security;
const operation = 'storeUser';
const fields = ['id', 'createdAt', 'updatedAt'];

describe('Store User Controller (e2e)', () => {
    it('Creates new USER sending CORRECT DATA', async () => {
        const user = UserFactory.generate();

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                password: { value: user.password, required: true },
                passwordRepeat: { value: user.password, required: true },
                email: { value: user.email, required: true }
            },
            fields
        });

        const { data } = body;

        expect(status).toBe(200);

        const userInDb = await prismaService.user.findFirst({
            where: { id: data[operation].id }
        });

        expect(userInDb).toEqual(
            expect.objectContaining({
                id: data[operation].id,
                email: user.email
            })
        );

        expect(userInDb['password']).toBeFalsy();

        expect(data[operation]).toEqual(
            expect.objectContaining({
                id: userInDb.id
            })
        );
    });

    it('BAD REQUEST when PASSWORD and PASSWORD_REPEAT not the same', async () => {
        const user = UserFactory.generate();

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                password: { value: user.password, required: true },
                passwordRepeat: {
                    value: faker.internet.password(),
                    required: true
                },
                email: { value: user.email, required: true }
            },
            fields
        });

        expect(status).toBe(200);

        const { errors } = body.errors[0];

        const expectedDialog = i18nService.__({
            phrase: 'passwordsNotTheSame',
            locale: 'en'
        });

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'passwordRepeat',
                messages: expect.arrayContaining([expectedDialog])
            })
        );
    });

    it('BAD REQUEST sending TOO SHORT PASSWORD', async () => {
        const user = UserFactory.generate();

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                password: { value: 'Abc1' },
                passwordRepeat: {
                    value: 'Abc1'
                },
                email: { value: user.email }
            },
            fields
        });

        const { errors } = body.errors[0];

        expect(status).toBe(200);

        const expectedDialog = i18nService.__({
            phrase: 'tooWeakPasswordError',
            locale: 'en'
        });

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'password',
                messages: expect.arrayContaining([expectedDialog])
            })
        );
    });

    it('BAD REQUEST when EMAIL ALREADY TAKEN', async () => {
        const userData = UserFactory.generate();
        const user = await UserFactory.create(userData);

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                password: { value: userData.password, required: true },
                passwordRepeat: {
                    value: userData.password,
                    required: true
                },
                email: { value: user.email, required: true }
            },
            fields
        });

        const { errors } = body.errors[0];

        expect(status).toBe(200);

        const expectedDialog = i18nService.__({
            phrase: 'emailTaken',
            locale: 'en'
        });

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'email',
                messages: expect.arrayContaining([expectedDialog])
            })
        );
    });

    it('BAD REQUEST sending NO DATA', async () => {
        const { status, body } = await graphQlMutation({
            operation,
            variables: {},
            fields
        });

        const { errors } = body.errors[0];
        expect(status).toBe(200);

        const expectedDialogPassword = [
            i18nService.__({
                phrase: 'notEmpty',
                locale: 'en'
            }),
            i18nService.__({
                phrase: 'tooShort',
                locale: 'en'
            }),
            i18nService.__({
                phrase: 'tooWeakPasswordError',
                locale: 'en'
            })
        ];

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'password',
                messages: expect.arrayContaining(expectedDialogPassword)
            })
        );

        const expectedDialogEmail = [
            i18nService.__({
                phrase: 'notEmailError',
                locale: 'en'
            })
        ];

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'email',
                messages: expect.arrayContaining(expectedDialogEmail)
            })
        );
    });
});
