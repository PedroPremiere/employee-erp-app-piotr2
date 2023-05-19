import * as request from 'supertest';

import { UsersFactory } from '../../../test/factories/user.factory';

const url = '/api/auth/login';

describe('Login Controller (e2e)', () => {
    describe('/api/auth/login (POST)', () => {
        it('Returns OK sending CORRECT DATA', async () => {
            const user = await UsersFactory.create();

            const { status, body } = await request(app.getHttpServer())
                .post(url)
                .send({ email: user.email, password: user.password });

            expect(status).toBe(200);

            expect(body.access_token).toBeTruthy();

            expect(body.user).toEqual(
                expect.objectContaining({
                    email: user.email,
                    id: user.id
                })
            );
        });

        it('Returns Unauthorized sending WRONG DATA', async () => {
            const { status, body } = await request(app.getHttpServer())
                .post(url)
                .send({ email: 'wrong@email.com', password: 'wrong password' });

            expect(status).toBe(401);

            expect(body).toEqual(
                expect.objectContaining({
                    message: 'Unauthorized',
                    statusCode: 401
                })
            );
        });

        it('Returns Unauthorized sending WRONG PASSWORD', async () => {
            const user = await UsersFactory.create();

            const { status, body } = await request(app.getHttpServer())
                .post(url)
                .send({ email: user.email, password: 'wrong password' });

            expect(status).toBe(401);

            expect(body).toEqual(
                expect.objectContaining({
                    message: 'Unauthorized',
                    statusCode: 401
                })
            );
        });

        it('Returns Unauthorized sending NO DATA', async () => {
            const { status, body } = await request(app.getHttpServer()).post(
                url
            );

            expect(status).toBe(401);

            expect(body).toEqual(
                expect.objectContaining({
                    message: 'Unauthorized',
                    statusCode: 401
                })
            );
        });
    });
});
