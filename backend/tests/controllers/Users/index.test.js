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

    describe('GET /users', () => {
        it('returns OK logged in as ADMIN', async () => {
            const { email, password } = adminData;

            await request.post('/auth/login').send({ email, password });

            const response = await request.get('/users');

            expect(response.body).toContainEqual(
                expect.objectContaining({
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    birthDate: user.birthDate
                })
            );

            expect(response.body).toContainEqual(
                expect.objectContaining({
                    id: admin.id,
                    email: admin.email,
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                    birthDate: admin.birthDate
                })
            );

            expect(response.status).toBe(StatusCodes.OK);
        });

        it('returns FORBIDDEN sending valid data as USER', async () => {
            const { email, password } = userData;

            await request.post('/auth/login').send({ email, password });

            const response = await request.get('/users');

            expect(response.status).toBe(StatusCodes.FORBIDDEN);
        });

        it('returns UNAUTHORIZED when NOT-LOGGED-IN', async () => {
            const response = await request.get('/users');

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });
    });
});
