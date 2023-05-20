import * as request from 'supertest';

import { UsersFactory } from '../../../test/factories/user.factory';

const url = '/api/me';

let access_token;
let user;
const loginUrl = '/api/auth/login';

describe('User Profile Controller (e2e)', () => {
    beforeAll(async () => {
        user = await UsersFactory.create();

        const { status, body } = await request(app.getHttpServer())
            .post(loginUrl)
            .send({ email: user.email, password: user.password });

        expect(status).toBe(200);

        access_token = body.access_token;
    });

    describe('/api/me (GET)', () => {
        it('Returns User Data as Logged in', async () => {
            const { status, body } = await request(app.getHttpServer())
                .get(url)
                .set('Authorization', 'Bearer ' + access_token);

            expect(status).toBe(200);

            expect(body.username).toEqual(user.email);
        });

        it('Returns Unauthorized as Not Logged in', async () => {
            const { status, body } = await request(app.getHttpServer()).get(
                url
            );

            expect(status).toBe(401);

            expect(body.statusCode).toEqual(401);
            expect(body.message).toEqual('Unauthorized');
        });
    });
});
