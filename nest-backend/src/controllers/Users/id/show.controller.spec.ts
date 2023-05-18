import * as request from 'supertest';

import { UsersFactory } from '../../../../test/factories/user.factory';

describe('Index User Controller (e2e)', () => {
    describe('/api/users (GET)', () => {
        it('Returns user DATA', async () => {
            const user = await UsersFactory.create();

            const { status, body } = await request(app.getHttpServer()).get(
                `/api/users/${user.id}`
            );

            expect(status).toBe(200);

            expect(body).toEqual(
                expect.objectContaining({
                    id: user.id,
                    email: user.email
                })
            );

            expect(body.password).toBeFalsy();
        });

        it('Returns NO FOUND sending NON EXISTING USER ID', async () => {
            await UsersFactory.create();

            const { status, body } = await request(app.getHttpServer()).get(
                `/api/users/WrongId`
            );

            expect(status).toBe(404);

            expect(body.message).toBe('Not Found');
            expect(body.statusCode).toBe(404);
        });
    });
});
