const { StatusCodes } = require('http-status-codes');
const app = require('../../../index');
const request = require('supertest-session')(app);
const userFactory = require('../../factories/User');
const truncateDatabase = require('../../helpers/truncate');
const roleSeeder = require('../../helpers/roleSeeder');
const vacationFactory = require('../../factories/Vacation');
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

let userData;
let user;
let adminData;
let admin;

const di = app.get('di');
const userRepository = di.get('repositories.user');

describe('VACATION', () => {
    describe('DELETE /vacations/:id', () => {
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

        it('returns NO CONTENT deleting existing VACATION as ADMIN', async () => {
            const vacationData = await vacationFactory.generate(user.id);
            const vacation = await vacationFactory.create(vacationData);

            const { email, password } = adminData;

            await request.post('/auth/login').send({ email, password });

            const { status } = await request.delete(
                `/vacations/${vacation.id}`
            );

            expect(status).toBe(StatusCodes.NO_CONTENT);

            const getResponseVacation = await request.get(
                `/vacations/${vacation.id}`
            );

            expect(getResponseVacation.status).toBe(StatusCodes.NOT_FOUND);

            const newUserData = await userRepository.findById(user.id);
            const { vacationDays: newVacationDays } = newUserData;
            const vacationDuration =
                dayjs
                    .duration(
                        dayjs(vacation.endDate).diff(dayjs(vacation.startDate))
                    )
                    .as('days') + 1;

            expect(newVacationDays).toBe(
                Math.ceil(user.vacationDays + vacationDuration)
            );
        });

        it('returns NO_CONTENT when VACATION belongs to USER and is not confirmed as USER', async () => {
            userData = userFactory.generate();
            user = await userFactory.create(userData);
            const { email, password } = userData;

            const vacationData = await vacationFactory.generate(user.id);
            const vacation = await vacationFactory.create(vacationData);

            await request.post('/auth/login').send({ email, password });

            const response = await request.delete(`/vacations/${vacation.id}`);

            expect(response.status).toBe(StatusCodes.NO_CONTENT);

            const newUserData = await userRepository.findById(user.id);
            const { vacationDays: newVacationDays } = newUserData;
            const vacationDuration =
                dayjs
                    .duration(
                        dayjs(vacation.endDate).diff(dayjs(vacation.startDate))
                    )
                    .as('days') + 1;

            expect(newVacationDays).toBe(
                Math.ceil(user.vacationDays + vacationDuration)
            );
        });

        it('returns NO CONTENT deleting non-existing VACATION as ADMIN', async () => {
            const { email, password } = adminData;

            await request.post('/auth/login').send({ email, password });

            const deleteResponse = await request.delete(
                '/vacations/wrong-data'
            );

            expect(deleteResponse.status).toBe(StatusCodes.NO_CONTENT);
        });

        it('returns NO_CONTENT when VACATION belongs to USER and is confirmed as USER', async () => {
            const { email, password } = userData;

            const vacationData = await vacationFactory.generate(user.id);
            vacationData.isConfirmed = true;
            const vacation = await vacationFactory.create(vacationData);

            await request.post('/auth/login').send({ email, password });

            const response = await request.delete(`/vacations/${vacation.id}`);

            expect(response.status).toBe(StatusCodes.FORBIDDEN);
        });

        it('returns FORBIDDEN when VACATION doesnt belong to USER as USER', async () => {
            const adminVacationData = await vacationFactory.generate(admin.id);
            const adminVacation = await vacationFactory.create(
                adminVacationData
            );
            const { email, password } = userData;

            await request.post('/auth/login').send({ email, password });

            const response = await request.delete(
                `/vacations/${adminVacation.id}`
            );

            expect(response.status).toBe(StatusCodes.FORBIDDEN);
        });

        it('returns UNAUTHORIZED as NOT LOGGED IN', async () => {
            const vacationData = await vacationFactory.generate(user.id);
            const vacation = await vacationFactory.create(vacationData);

            const response = await request.delete(`/vacations/${vacation.id}`);

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });
    });
});
