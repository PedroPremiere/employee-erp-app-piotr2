const { StatusCodes } = require('http-status-codes');
const app = require('../../../index');
const request = require('supertest-session')(app);
const userFactory = require('../../factories/User');
const truncateDatabase = require('../../helpers/truncate');
const roleSeeder = require('../../helpers/roleSeeder');

let userData;
let adminData;

describe('Users', () => {
    describe('POST /users', () => {
        beforeAll(async () => {
            await truncateDatabase();

            const { adminRole } = await roleSeeder();

            adminData = userFactory.generate();
            admin = await userFactory.create(adminData);
            admin.addRole(adminRole.id);
        });

        beforeEach(async () => {
            userData = userFactory.generate();
        });

        afterEach(async () => {
            await request.post('/auth/logout');
        });

        it('returns CREATED sending valid data as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });

            const response = await request.post('/users').send(userData);

            expect(response.body).toEqual(
                expect.objectContaining({
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName
                })
            );

            expect(response.status).toBe(StatusCodes.CREATED);
        });

        it('returns BAD REQUEST when body section is empty as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });

            const response = await request.post('/users');

            expect(response.body.errors).toContainEqual({
                message: 'Should not be empty',
                param: 'password'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Password must have more than 8 characters',
                param: 'password'
            });

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

        it('returns BAD REQUEST when email is taken as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });

            await userFactory.create(userData);

            const response = await request.post('/users').send(userData);

            expect(response.body.errors).toContainEqual({
                message: 'E-mail already in use',
                param: 'email'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns FORBIDDEN sending valid data as USER', async () => {
            const { email, password } = userData;
            await userFactory.create(userData);
            await request.post('/auth/login').send({ email, password });

            const response = await request.post('/users').send(userData);

            expect(response.status).toBe(StatusCodes.FORBIDDEN);
        });

        it('returns UNAUTHORIZED as NOT LOGGED IN', async () => {
            const response = await request.post('/users').send(userData);

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });
    });
});
