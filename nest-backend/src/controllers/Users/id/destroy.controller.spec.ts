import * as request from 'supertest';

import { UsersFactory } from '../../../../test/factories/user.factory';

const url = '/api/users';

describe('Delete User Controller (e2e)', () => {
    describe('/api/users/:id (DELETE)', () => {
        it('Deletes user', async () => {
            const user = await UsersFactory.create();

            const { status, body } = await request(app.getHttpServer()).delete(
                `${url}/${user.id}`
            );

            expect(status).toBe(204);

            expect(body).toEqual({});

            expect(body.password).toBeFalsy();
        });

        it('Returns NO FOUND sending NON EXISTING USER ID', async () => {
            await UsersFactory.create();

            const { status, body } = await request(app.getHttpServer()).delete(
                `${url}/WrongId`
            );

            expect(status).toBe(404);

            expect(body.message).toBe('Not Found');
            expect(body.statusCode).toBe(404);
        });
    });
});
