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

describe('Profile', () => {
    describe('PUT /auth/profile', () => {
        beforeAll(async () => {
            await truncateDatabase();

            const { adminRole } = await roleSeeder();

            adminData = userFactory.generate();
            admin = await userFactory.create(adminData);
            admin.addRole(adminRole.id);
        });

        beforeEach(async () => {
            userData = userFactory.generate();
            user = await userFactory.create(userData);
        });

        afterEach(async () => {
            await request.post('/auth/logout');
        });

        it('returns OK sending correct data as USER', async () => {
            const { email, password } = userData;
            await request.post('/auth/login').send({ email, password });

            const newUserData = userFactory.generate();
            newUserData.password = password;
            const response = await request
                .put(`/auth/profile`)
                .send(newUserData);

            expect(response.body).toEqual(
                expect.objectContaining({
                    id: userData.id,
                    email: newUserData.email,
                    firstName: newUserData.firstName,
                    lastName: newUserData.lastName,
                    birthDate: newUserData.birthDate
                })
            );

            expect(response.status).toBe(StatusCodes.OK);
        });

        it('returns FORBIDDEN sending wrong password as USER', async () => {
            const { email, password } = userData;
            await request.post('/auth/login').send({ email, password });

            const newUserData = userFactory.generate();

            const response = await request
                .put(`/auth/profile`)
                .send(newUserData);

            expect(response.status).toBe(StatusCodes.FORBIDDEN);
        });

        it('returns BAD REQUEST when no data sent as USER', async () => {
            const { email, password } = userData;
            await request.post('/auth/login').send({ email, password });

            const response = await request.put(`/auth/profile`);

            expect(response.body.errors).toContainEqual({
                message: 'Should not be empty',
                param: 'firstName'
            });

            expect(response.body.errors).toContainEqual({
                message: 'First Name must have more than 2 characters',
                param: 'firstName'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Should not be empty',
                param: 'lastName'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Last Name must have more than 2 characters',
                param: 'lastName'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Should not be empty',
                param: 'email'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Mail not valid',
                param: 'email'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Should not be empty',
                param: 'birthDate'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Date must be in ISO8601 format(YYYY-MM-DD)',
                param: 'birthDate'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns UNAUTHORIZED as NOT-LOGGED-IN', async () => {
            const newUserData = userFactory.generate();
            const response = await request
                .put(`/auth/profile`)
                .send(newUserData);

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });
    });
});
