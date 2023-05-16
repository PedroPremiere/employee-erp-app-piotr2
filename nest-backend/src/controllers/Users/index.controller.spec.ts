import * as request from 'supertest';

import { UsersFactory } from '../../../test/factories/user.factory';

describe('Index User Controller (e2e)', () => {
    describe('/api/users (GET)', () => {
        it('Returns empty list when NO DATA', async () => {
            const { status, body } = await request(app.getHttpServer()).get(
                '/api/users'
            );

            expect(status).toBe(200);
            expect(body).toEqual([]);
        });

        it('Returns list of users', async () => {
            const user = await UsersFactory.create();

            const { status, body } = await request(app.getHttpServer()).get(
                '/api/users'
            );

            expect(status).toBe(200);
            expect(body).toContainEqual(
                expect.objectContaining({
                    id: user.id,
                    email: user.email
                })
            );

            for (const item of body) {
                expect(item.password).toBeFalsy();
            }
        });
    });
});
