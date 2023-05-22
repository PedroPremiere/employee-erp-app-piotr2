import { post } from '@test/methods/post';
import { Routes } from '@/types/enums/Routes';
import { UsersFactory } from '@test/factories/user.factory';
import { badRequestAssertion } from '@test/assertion/badRequest';
import { noPasswordAssertion } from '@test/assertion/noPassword';

const url = `/api/${Routes.USERS}`;
const minPasswordLen = 6;

const notEmailError = 'email must be an email';
const emptyPasswordError = 'password should not be empty';
const tooWeakPasswordError = 'password is not strong enough';
const tooShortPasswordError = `password must be longer than or equal to ${minPasswordLen} characters`;

describe('Index User Controller (e2e)', () => {
    describe(`${url} (GET)`, () => {
        it('Creates new USER sending CORRECT DATA', async () => {
            const user = UsersFactory.generate();

            const { status, body } = await post({ url, payload: user });

            expect(status).toBe(201);

            expect(body).toEqual(
                expect.objectContaining({
                    email: user.email
                })
            );

            noPasswordAssertion(body);
        });

        it('BAD REQUEST sending TOO SHORT PASSWORD', async () => {
            const user = UsersFactory.generate();
            const payload = { email: user.email, password: 'Abc1' };

            const { status, body } = await post({ url, payload });

            const expectedMessage = [
                {
                    error: [tooWeakPasswordError, tooShortPasswordError].join(
                        ', '
                    ),
                    field: 'password'
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

            const payload = { password: user.password };

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
