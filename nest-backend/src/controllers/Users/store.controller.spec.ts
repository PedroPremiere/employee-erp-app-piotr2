import * as request from 'supertest';

import { UsersFactory } from '../../../test/factories/user.factory';

const url = '/api/users';
const minPasswordLen = 6;

const tooWeakPasswordError = 'password is not strong enough';
const tooShortPasswordError = `password must be longer than or equal to ${minPasswordLen} characters`;
const emptyPasswordError = 'password should not be empty';
const notEmailError = 'email must be an email';

describe('Index User Controller (e2e)', () => {
    describe('/api/users (GET)', () => {
        it('Creates new USER sending CORRECT DATA', async () => {
            const user = UsersFactory.generate();

            const { status, body } = await request(app.getHttpServer())
                .post(url)
                .send(user);

            expect(status).toBe(201);

            expect(body).toEqual(
                expect.objectContaining({
                    email: user.email
                })
            );

            expect(body.password).toBeFalsy();
        });

        it('Returns BAD REQUEST sending TOO SHORT PASSWORD', async () => {
            const user = UsersFactory.generate();

            const { status, body } = await request(app.getHttpServer())
                .post(url)
                .send({ email: user.email, password: 'Abc1' });

            expect(status).toBe(400);

            expect(body).toEqual(
                expect.objectContaining({
                    error: 'Bad Request',
                    message: [
                        {
                            error: [
                                tooWeakPasswordError,
                                tooShortPasswordError
                            ].join(', '),
                            field: 'password'
                        }
                    ],
                    statusCode: 400
                })
            );

            expect(body.password).toBeFalsy();
        });

        it('Returns BAD REQUEST sending NO PASSWORD', async () => {
            const user = UsersFactory.generate();

            const { status, body } = await request(app.getHttpServer())
                .post(url)
                .send({ email: user.email });

            expect(status).toBe(400);

            expect(body).toEqual(
                expect.objectContaining({
                    error: 'Bad Request',
                    message: [
                        {
                            error: [
                                tooWeakPasswordError,
                                tooShortPasswordError,
                                emptyPasswordError
                            ].join(', '),
                            field: 'password'
                        }
                    ],
                    statusCode: 400
                })
            );

            expect(body.password).toBeFalsy();
        });

        it('Returns BAD REQUEST sending NO EMAIL', async () => {
            const user = UsersFactory.generate();

            const { status, body } = await request(app.getHttpServer())
                .post(url)
                .send({ password: user.password });

            expect(status).toBe(400);

            expect(body).toEqual(
                expect.objectContaining({
                    error: 'Bad Request',
                    message: [
                        {
                            error: notEmailError,
                            field: 'email'
                        }
                    ],
                    statusCode: 400
                })
            );

            expect(body.password).toBeFalsy();
        });

        it('Returns BAD REQUEST sending NO DATA', async () => {
            const { status, body } = await request(app.getHttpServer())
                .post(url)
                .send();

            expect(status).toBe(400);

            expect(body).toEqual(
                expect.objectContaining({
                    error: 'Bad Request',
                    message: [
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
                    ],
                    statusCode: 400
                })
            );

            expect(body.password).toBeFalsy();
        });
    });
});
