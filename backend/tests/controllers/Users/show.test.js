const { StatusCodes } = require('http-status-codes');
const app = require('../../../index');
const request = require('supertest-session')(app);
const userFactory = require('../../factories/User');
const truncateDatabase = require('../../helpers/truncate');
const roleSeeder = require('../../helpers/roleSeeder');

let userData;
let adminData;
let admin;
let user;

describe('Users', () => {
    describe('GET /users/:id ', () => {
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

        afterEach(async () => {
            await request.post('/auth/logout');
        });

        it('returns OK when USER exists as Admin', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });

            const response = await request.get(`/users/${userData.id}`);

            expect(response.body).toEqual(
                expect.objectContaining({
                    id: userData.id,
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    birthDate: userData.birthDate
                })
            );

            expect(response.status).toBe(StatusCodes.OK);
        });

        it('returns NOT_FOUND when USER does not exist as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });

            const response = await request.get('/users/not-found');

            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        });

        it('returns FORBIDDEN sending request as USER', async () => {
            const { email, password } = userData;
            await request.post('/auth/login').send({ email, password });

            const response = await request.get(`/users/${userData.id}`);

            expect(response.status).toBe(StatusCodes.FORBIDDEN);
        });

        it('returns UNAUTHORIZED as NOT-LOGGED-IN', async () => {
            const response = await request.get(`/users/${userData.id}`);

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });
    });
});
