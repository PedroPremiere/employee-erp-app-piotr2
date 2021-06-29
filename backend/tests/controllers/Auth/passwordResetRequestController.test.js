const { StatusCodes } = require('http-status-codes');
const app = require('../../../index');
const request = require('supertest-session')(app);
const userFactory = require('../../factories/User');
const truncateDatabase = require('../../helpers/truncate');

let userData;
let user;

const di = app.get('di');
const userRepository = di.get('repositories.user');

describe('password-reset', () => {
    describe('PUT /password-reset', () => {
        beforeAll(async () => {
            await truncateDatabase();
            userData = userFactory.generate();
            user = await userFactory.create(userData);
        });

        it('returns OK sending valid data as NOT LOGGED', async () => {
            const { email } = userData;
            const response = await request
                .post('/auth/password-reset/')
                .send({ email });

            const updatedUser = await userRepository.getByEmail(email);

            expect(updatedUser.passwordResetToken).toBeTruthy();

            expect(response.status).toBe(StatusCodes.OK);
        });

        it('returns OK sending invalid data as NOT LOGGED ', async () => {
            const email = 'fakemail@example.com';

            const response = await request
                .post('/auth/password-reset/')
                .send({ email });

            expect(response.status).toBe(StatusCodes.OK);
        });

        it('returns BAD REQUEST when body section is empty as NOT LOGGED', async () => {
            const response = await request.post(`/auth/password-reset/`);

            expect(response.body.errors).toContainEqual({
                message: 'Should not be empty',
                param: 'email'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Mail not valid',
                param: 'email'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });
    });
});
