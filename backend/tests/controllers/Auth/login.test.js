const { StatusCodes } = require('http-status-codes');
const app = require('../../../index');
const request = require('supertest-session')(app);
const userFactory = require('../../factories/User');
const truncateDatabase = require('../../helpers/truncate');

let userData;

describe('Auth', () => {
    beforeAll(async () => {
        await truncateDatabase();

        userData = await userFactory.generate();
        userFactory.create(userData);
    });

    afterEach(async () => {
        request.post('/auth/logout');
    });

    describe('POST /auth/login', () => {
        it('returns OK when sending proper data', async () => {
            const { email, password } = userData;

            const response = await request
                .post('/auth/login')
                .send({ email, password });

            expect(response.body.id).toBeTruthy();
            expect(response.body.birthDate).toBeTruthy();
            expect(response.body.createdAt).toBeTruthy();
            expect(response.body.email).toBeTruthy();
            expect(response.body.firstName).toBeTruthy();
            expect(response.body.lastName).toBeTruthy();
            expect(response.body.roles).toBeTruthy();

            expect(response.status).toBe(StatusCodes.OK);
        });

        it('returns BAD_REQUEST when sending empty data', async () => {
            const response = await request.post('/auth/login');

            expect(response.header['content-type']).toBe(
                'application/json; charset=utf-8'
            );

            expect(response.body.errors).toContainEqual({
                message: 'Should not be empty',
                param: 'email'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Should not be empty',
                param: 'password'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Password must have more than 8 characters',
                param: 'password'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Mail not valid',
                param: 'email'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns UNAUTHORIZED when sending wrong data', async () => {
            const { email } = userData;
            const password = 'wrongPassword';

            const response = await request
                .post('/auth/login')
                .send({ email, password });

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });

        it('returns UNAUTHORIZED when sending proper not existing data', async () => {
            const userData = {
                email: 'wrong@user.com',
                password: 'wrongPassword'
            };

            const response = await request.post('/auth/login').send(userData);

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });
    });
});
