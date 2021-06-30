const { StatusCodes } = require('http-status-codes');
const app = require('../../../index');
const request = require('supertest-session')(app);
const userFactory = require('../../factories/User');
const truncateDatabase = require('../../helpers/truncate');

let userData;
let user;

describe('password-change', () => {
    describe('POST auth/password-change', () => {
        beforeAll(async () => {
            await truncateDatabase();
        });

        afterEach(async () => {
            await request.post('/auth/logout');
        });

        it('returns OK sending correct data  as USER', async () => {
            userData = userFactory.generate();
            user = await userFactory.create(userData);

            const { email } = userData;
            const currentPassword = userData.password;
            const password = 'password123';
            const passwordConfirmation = 'password123';

            await request
                .post('/auth/login')
                .send({ password: currentPassword, email });

            const response = await request
                .post('/auth/password-change')
                .send({ currentPassword, password, passwordConfirmation });

            expect(response.status).toBe(StatusCodes.OK);

            const responseWithNewPassword = await request
                .post('/auth/login')
                .send({ password, email });

            expect(responseWithNewPassword.status).toBe(StatusCodes.OK);
        });

        it('returns BAD REQUEST sending wrong data  as USER', async () => {
            userData = userFactory.generate();
            user = await userFactory.create(userData);

            const { email } = userData;
            const currentPassword = userData.password;
            const password = 'password123';
            const passwordConfirmation = 'password456';

            await request
                .post('/auth/login')
                .send({ password: currentPassword, email });

            const response = await request
                .post('/auth/password-change')
                .send({ currentPassword, password, passwordConfirmation });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);

            expect(response.body.errors).toContainEqual({
                message:
                    'passwordConfirmation and Password Repeat must be the same',
                param: 'passwordConfirmation'
            });

            const responseWithNewPassword = await request
                .post('/auth/login')
                .send({ password, email });

            expect(responseWithNewPassword.status).toBe(
                StatusCodes.UNAUTHORIZED
            );
        });

        it('returns BAD REQUEST sending no data  as USER', async () => {
            userData = userFactory.generate();
            user = await userFactory.create(userData);

            const { email, password } = userData;

            await request.post('/auth/login').send({ password, email });

            const response = await request.post('/auth/password-change');

            expect(response.body.errors).toContainEqual({
                message: 'Should not be empty',
                param: 'currentPassword'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Current password must have more than 8 characters',
                param: 'currentPassword'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Should not be empty',
                param: 'password'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Password must have more than 8 characters',
                param: 'password'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns UNAUTHORIZED when NOT-LOGGED-IN', async () => {
            const response = await request.post('/auth/password-change');

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });

        it('returns FORBIDDEN sending wrong password  as USER', async () => {
            userData = userFactory.generate();
            user = await userFactory.create(userData);

            const { email } = userData;
            const currentPassword = userData.password;

            const password = 'password123';
            const passwordConfirmation = 'password123';

            await request
                .post('/auth/login')
                .send({ password: currentPassword, email });

            const wrong_password = 'wrong_password';

            const response = await request.post('/auth/password-change').send({
                currentPassword: wrong_password,
                password,
                passwordConfirmation
            });

            expect(response.status).toBe(StatusCodes.FORBIDDEN);
        });
    });
});
