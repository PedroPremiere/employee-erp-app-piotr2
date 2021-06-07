const { StatusCodes } = require('http-status-codes');
const app = require('../../../index');
const request = require('supertest-session')(app);
const userFactory = require('../../factories/User');
const truncateDatabase = require('../../helpers/truncate');
const roleSeeder = require('../../helpers/roleSeeder');

describe('Auth', () => {
    beforeAll(async () => {
        await truncateDatabase();

        const { adminRole, userRole } = await roleSeeder();

        userData = userFactory.generate();
        user = await userFactory.create(userData);
        user.addRole(userRole.id);

        adminData = userFactory.generate();
        admin = await userFactory.create(adminData);
        admin.addRole(adminRole.id);
    });

    describe('POST /auth/logout', () => {
        it('returns NO_CONTENT as ADMIN', async () => {
            const { email, password } = adminData;

            await request.post('/auth/login').send({ email, password });

            const response = await request.post('/auth/logout');

            expect(response.status).toBe(StatusCodes.NO_CONTENT);
        });

        it('returns NO_CONTENT as USER', async () => {
            const { email, password } = userData;

            await request.post('/auth/login').send({ email, password });

            const response = await request.post('/auth/logout');

            expect(response.status).toBe(StatusCodes.NO_CONTENT);
        });

        it('returns UNAUTHORIZED as NOT LOGGED IN', async () => {
            const response = await request.post('/auth/logout');

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });
    });
});
