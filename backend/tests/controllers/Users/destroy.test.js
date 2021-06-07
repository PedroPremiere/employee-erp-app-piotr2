const { StatusCodes } = require('http-status-codes');
const app = require('../../../index');
const request = require('supertest-session')(app);
const userFactory = require('../../factories/User');
const truncateDatabase = require('../../helpers/truncate');
const roleSeeder = require('../../helpers/roleSeeder');

let userData;
let user;
let userToDelete;
let adminData;
let admin;

afterAll(() => {
    request.post('/auth/logout');
});

describe('Users', () => {
    beforeEach(async () => {
        await truncateDatabase();

        const { adminRole, userRole } = await roleSeeder();

        userData = userFactory.generate();
        user = await userFactory.create(userData);
        user.addRole(userRole.id);

        userToDelete = await userFactory.create();

        adminData = userFactory.generate();
        admin = await userFactory.create(adminData);
        admin.addRole(adminRole.id);
    });

    describe('DELETE /users/:id', () => {
        it('returns NO CONTENT deleting existing user as ADMIN', async () => {
            const { email, password } = adminData;

            await request.post('/auth/login').send({ email, password });

            const deleteResponse = await request.delete(
                `/users/${userToDelete.id}`
            );

            expect(deleteResponse.status).toBe(StatusCodes.NO_CONTENT);

            const getResponse = await request.get(`/users/${userToDelete.id}`);

            expect(getResponse.status).toBe(StatusCodes.NOT_FOUND);
        });

        it('returns NO CONTENT deleting non-existing user as ADMIN', async () => {
            const { email, password } = adminData;

            await request.post('/auth/login').send({ email, password });

            const wrongUserData = userFactory.generate();

            const deleteResponse = await request.delete(
                `/users/${wrongUserData.id}`
            );

            expect(deleteResponse.status).toBe(StatusCodes.NO_CONTENT);
        });

        it('returns UNAUTHORIZED as NOT LOGGED IN', async () => {
            const response = await request.delete(`/users/${userToDelete.id}`);

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });

        it('returns FORBIDDEN as USER', async () => {
            const { email, password } = userData;

            await request.post('/auth/login').send({ email, password });

            const response = await request.delete(`/users/${userToDelete.id}`);

            expect(response.status).toBe(StatusCodes.FORBIDDEN);
        });
    });
});
