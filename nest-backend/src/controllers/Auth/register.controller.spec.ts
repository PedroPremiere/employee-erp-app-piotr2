import { post } from '@test/methods/post';
import { Routes } from '@/types/enums/Routes';
import { UsersFactory } from '@test/factories/user.factory';
import { badRequestAssertion } from '@test/assertion/badRequest';
import { noPasswordAssertion } from '@test/assertion/noPassword';
import { createUserErrorDialogs } from '@/dialogs/errors/CreateUserErrorDialogs';

const url = `/api/${Routes.REGISTER}`;

const {
    notEmailError,
    emptyPasswordError,
    tooWeakPasswordError,
    tooShortPasswordError
} = createUserErrorDialogs;

describe('Register Controller (e2e)', () => {
    describe(`${url} (POST)`, () => {
        it('Returns OK sending CORRECT DATA', async () => {
            const user = UsersFactory.generate();

            const payload = { email: user.email, password: user.password };

            const { status, body } = await post({ url, payload });

            expect(status).toBe(200);

            expect(body.access_token).toBeTruthy();

            expect(body.user).toEqual(
                expect.objectContaining({
                    email: user.email
                })
            );
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
