const { StatusCodes } = require('http-status-codes');
const app = require('../../../index');
const request = require('supertest-session')(app);
const userFactory = require('../../factories/User');
const truncateDatabase = require('../../helpers/truncate');
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

let userData;
let user;

const di = app.get('di');
const userRepository = di.get('repositories.user');
const passwordResetTokenGeneratorHandler = di.get(
    'services.passwordResetTokenGeneratorHandler'
);

describe('password-reset', () => {
    describe('PUT /password-reset/code', () => {
        beforeAll(async () => {
            await truncateDatabase();
            userData = userFactory.generate();
            userData.passwordResetToken =
                await passwordResetTokenGeneratorHandler.handle();

            userData.passwordResetTokenExpiresAt = dayjs().add(2, 'hour');
            user = await userFactory.create(userData);
        });

        it('returns OK sending valid data as NOT LOGGED', async () => {
            const password = 'password123';
            const passwordRepeat = password;
            const { email } = user;

            const response = await request
                .post(`/auth/password-reset/${user.passwordResetToken}`)
                .send({
                    password,
                    passwordRepeat
                });

            const updatedUser = await userRepository.getByEmail(email);
            expect(updatedUser.passwordResetToken).toBe(null);

            expect(response.status).toBe(StatusCodes.OK);

            const loginResponse = await request
                .post('/auth/login')
                .send({ email, password });

            expect(loginResponse.status).toBe(StatusCodes.OK);
        });

        it('returns BAD REQUEST when password and password repeat are not equal as NOT LOGGED', async () => {
            const response = await request
                .post(`/auth/password-reset/${user.passwordResetToken}`)
                .send({
                    password: 'password123',
                    passwordRepeat: '456password'
                });

            expect(response.body.errors).toContainEqual({
                message: 'Password and Password Repeat must be the same',
                param: 'passwordRepeat'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns BAD REQUEST when body section is empty as NOT LOGGED', async () => {
            const response = await request.post(
                `/auth/password-reset/${user.passwordResetToken}`
            );

            expect(response.body.errors).toContainEqual({
                message: 'Should not be empty',
                param: 'password'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Password must have more than 8 characters',
                param: 'password'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Invalid value',
                param: 'passwordRepeat'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });
    });
});
