/*
 * @group register
 */

import { conf } from '@/config';
import { post } from '@test/methods/post';
import { Routes } from '@/types/enums/Routes';
import { UsersFactory } from '@test/factories/user.factory';
import { badRequestAssertion } from '@test/assertion/badRequest';
import { noPasswordAssertion } from '@test/assertion/noPassword';
import { createUserErrorDialogs } from '@/dialogs/errors/CreateUserErrorDialogs';
import { faker } from '@faker-js/faker';

const url = `/${conf.api.prefix}/${Routes.REGISTER}`;

const {
    notEmailError,
    emailTakenError,
    emptyPasswordError,
    tooWeakPasswordError,
    tooShortPasswordError,
    passwordRepeatNotTheSame
} = createUserErrorDialogs;

describe('Register Controller (e2e)', () => {
    describe(`${url} (POST)`, () => {
        it('Returns OK sending CORRECT DATA', async () => {
            const user = UsersFactory.generate();

            const payload = {
                email: user.email,
                password: user.password,
                passwordRepeat: user.password
            };

            const { status, body } = await post({ url, payload });

            expect(status).toBe(200);

            expect(body.access_token).toBeTruthy();

            expect(body.user).toEqual(
                expect.objectContaining({
                    email: user.email
                })
            );
        });

        it('BAD REQUEST when PASSWORD and PASSWORD_REPEAT not the same', async () => {
            const user = UsersFactory.generate();
            const payload = {
                ...user,
                passwordRepeat: faker.internet.password()
            };

            const { status, body } = await post({ url, payload });

            const expectedMessage = [
                {
                    error: [passwordRepeatNotTheSame].join(', '),
                    field: 'passwordRepeat'
                }
            ];

            badRequestAssertion(status, body, expectedMessage);
            noPasswordAssertion(body);
        });

        it('BAD REQUEST when EMAIL ALREADY TAKEN', async () => {
            const user = await UsersFactory.create();

            const payload = { ...user, passwordRepeat: user.password };

            const { status, body } = await post({ url, payload });

            const expectedMessage = [
                {
                    error: [emailTakenError].join(', '),
                    field: 'email'
                }
            ];

            badRequestAssertion(status, body, expectedMessage);
            noPasswordAssertion(body);
        });

        it('BAD REQUEST sending NO PASSWORD', async () => {
            const user = UsersFactory.generate();

            const payload = {
                email: user.email
            };

            const { status, body } = await post({ url, payload });

            const expectedMessage = [
                {
                    error: [
                        tooWeakPasswordError,
                        tooShortPasswordError,
                        emptyPasswordError
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
                    error: notEmailError,
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
                        tooWeakPasswordError,
                        tooShortPasswordError,
                        emptyPasswordError
                    ].join(', '),
                    field: 'password'
                },
                {
                    error: notEmailError,
                    field: 'email'
                }
            ];

            badRequestAssertion(status, body, expectedMessage);
            noPasswordAssertion(body);
        });
    });
});
