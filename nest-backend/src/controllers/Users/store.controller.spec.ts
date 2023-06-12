/*
 * @group store
 * @group user
 * @group userStore
 */

import { faker } from '@faker-js/faker';

import { conf } from '@/config';
import { post } from '@test/methods/post';
import { RoutesEnum } from '@/types/enums/Routes.enum';
import { badRequestAssertion } from '@test/assertion/badRequest';
import { noPasswordAssertion } from '@test/assertion/noPassword';
import { UserFactory } from '@/db/factories/UserFactory';

const url = `/${conf.api.prefix}/${RoutesEnum.USERS}`;
const { minLength } = conf.security;

describe('Store User Controller (e2e)', () => {
    describe(`${url} (GET)`, () => {
        it('Creates new USER sending CORRECT DATA', async () => {
            const user = UserFactory.generate();

            const payload = { ...user, passwordRepeat: user.password };

            const { status, body } = await post({ url, payload });

            expect(status).toBe(201);

            expect(body).toEqual(
                expect.objectContaining({
                    email: user.email
                })
            );

            noPasswordAssertion(body);
        });

        it('BAD REQUEST when PASSWORD and PASSWORD_REPEAT not the same', async () => {
            const user = UserFactory.generate();
            const payload = {
                ...user,
                passwordRepeat: faker.internet.password()
            };

            const { status, body } = await post({ url, payload });

            const expectedMessage = [
                {
                    error: [
                        i18nService.translate('errors.passwordsTheSame')
                    ].join(', '),
                    field: 'passwordRepeat'
                }
            ];

            badRequestAssertion(status, body, expectedMessage);
            noPasswordAssertion(body);
        });

        it('BAD REQUEST sending TOO SHORT PASSWORD', async () => {
            const user = UserFactory.generate();
            const payload = { email: user.email, password: 'Abc1' };

            const { status, body } = await post({ url, payload });

            const expectedMessage = [
                {
                    error: [
                        i18nService.translate('errors.tooWeakPasswordError'),
                        i18nService.translate('errors.tooShort', {
                            args: { minLength }
                        })
                    ].join(', '),
                    field: 'password'
                },
                {
                    error: [
                        i18nService.translate('errors.passwordsTheSame')
                    ].join(', '),
                    field: 'passwordRepeat'
                }
            ];

            badRequestAssertion(status, body, expectedMessage);
            noPasswordAssertion(body);
        });
        /*
                it('BAD REQUEST when EMAIL ALREADY TAKEN', async () => {
                    const user = await UsersFactory.create();

                    const payload = { ...user, passwordRepeat: user.password };

                    const { status, body } = await post({ url, payload });

                    const expectedMessage = [
                        {
                            error: [i18nService.translate('errors.emailTaken')].join(
                                ', '
                            ),
                            field: 'email'
                        }
                    ];

                    badRequestAssertion(status, body, expectedMessage);
                    noPasswordAssertion(body);
                });

                it('BAD REQUEST sending NO PASSWORD', async () => {
                    const user = UsersFactory.generate();

                    const payload = { email: user.email };

                    const { status, body } = await post({ url, payload });

                    const expectedMessage = [
                        {
                            error: [
                                i18nService.translate('errors.tooWeakPasswordError'),
                                i18nService.translate('errors.tooShort', {
                                    args: { minLength }
                                }),
                                i18nService.translate('errors.notEmpty')
                            ].join(', '),
                            field: 'password'
                        }
                    ];

                    badRequestAssertion(status, body, expectedMessage);
                    noPasswordAssertion(body);
                });

                it('BAD REQUEST sending NO EMAIL', async () => {
                    const user = UsersFactory.generate();

                    const payload = {
                        password: user.password,
                        passwordRepeat: user.password
                    };

                    const { status, body } = await post({ url, payload });

                    const expectedMessage = [
                        {
                            error: i18nService.translate('errors.notEmailError'),
                            field: 'email'
                        }
                    ];

                    badRequestAssertion(status, body, expectedMessage);
                    noPasswordAssertion(body);
                });

                it('BAD REQUEST sending NO DATA', async () => {
                    const { status, body } = await post({ url });

                    const expectedMessage = [
                        {
                            error: [
                                i18nService.translate('errors.tooWeakPasswordError'),
                                i18nService.translate('errors.tooShort', {
                                    args: { minLength }
                                }),
                                i18nService.translate('errors.notEmpty')
                            ].join(', '),
                            field: 'password'
                        },
                        {
                            error: i18nService.translate('errors.notEmailError'),
                            field: 'email'
                        }
                    ];

                    badRequestAssertion(status, body, expectedMessage);
                    noPasswordAssertion(body);
                });

         */
    });
});
