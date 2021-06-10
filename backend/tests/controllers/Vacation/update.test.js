const { StatusCodes } = require('http-status-codes');
const app = require('../../../index');
const request = require('supertest-session')(app);
const userFactory = require('../../factories/User');
const truncateDatabase = require('../../helpers/truncate');
const roleSeeder = require('../../helpers/roleSeeder');
const contractFactory = require('../../factories/Contract');
const vacationFactory = require('../../factories/Vacation');
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

let userData;
let user;
let adminData;

const di = app.get('di');
const userRepository = di.get('repositories.user');

describe('VACATION', () => {
    describe('PUT /vacations/:id', () => {
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

        it('returns CREATED sending valid data as USER', async () => {
            const contractData = await contractFactory.generate(user.id);
            await contractFactory.create(contractData);

            const vacationData = await vacationFactory.generate(user.id);

            vacationData.startDate = contractData.endDate;
            vacationData.endDate = contractData.endDate;

            const vacation = await vacationFactory.create(vacationData);

            const newVacationData = vacationData;

            newVacationData.startDate = contractData.startDate;

            const { email, password } = userData;
            await request.post('/auth/login').send({ email, password });

            const response = await request
                .put(`/vacations/${vacation.id}`)
                .send(newVacationData);

            expect(response.body).toEqual(
                expect.objectContaining({
                    endDate: newVacationData.endDate,
                    startDate: newVacationData.startDate,
                    userId: newVacationData.userId
                })
            );

            expect(response.status).toBe(StatusCodes.OK);

            const newUserDate = await userRepository.findById(user.id);
            const newVacationDays = newUserDate.vacationDays;
            const newVacationDuration =
                dayjs
                    .duration(
                        dayjs(newVacationData.endDate).diff(
                            dayjs(newVacationData.startDate)
                        )
                    )
                    .as('days') + 1;

            const oldVacationDuration =
                dayjs
                    .duration(
                        dayjs(vacationData.endDate).diff(
                            dayjs(vacationData.startDate)
                        )
                    )
                    .as('days') + 1;

            expect(newVacationDays).toBe(
                Math.ceil(
                    user.vacationDays -
                        (oldVacationDuration - newVacationDuration)
                )
            );
        });

        it('returns CREATED sending valid data as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });

            const newUserData = userFactory.generate();
            const newUser = await userFactory.create(newUserData);

            const contractData = await contractFactory.generate(newUser.id);
            await contractFactory.create(contractData);

            const vacationData = await vacationFactory.generate(newUser.id);

            vacationData.startDate = contractData.endDate;
            vacationData.endDate = contractData.endDate;

            const vacation = await vacationFactory.create(vacationData);

            const newVacationData = vacationData;

            newVacationData.startDate = contractData.startDate;

            const response = await request
                .put(`/vacations/${vacation.id}`)
                .send(newVacationData);

            expect(response.body).toEqual(
                expect.objectContaining({
                    endDate: newVacationData.endDate,
                    startDate: newVacationData.startDate,
                    userId: newVacationData.userId
                })
            );

            expect(response.status).toBe(StatusCodes.OK);

            const newUserDate = await userRepository.findById(newUser.id);
            const newVacationDays = newUserDate.vacationDays;
            const newVacationDuration =
                dayjs
                    .duration(
                        dayjs(newVacationData.endDate).diff(
                            dayjs(newVacationData.startDate)
                        )
                    )
                    .as('days') + 1;

            const oldVacationDuration =
                dayjs
                    .duration(
                        dayjs(vacationData.endDate).diff(
                            dayjs(vacationData.startDate)
                        )
                    )
                    .as('days') + 1;

            expect(newVacationDays).toBe(
                Math.ceil(
                    newUser.vacationDays -
                        (oldVacationDuration - newVacationDuration)
                )
            );
        });

        it('returns BAD REQUEST when body section is empty as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });

            const vacationData = await vacationFactory.generate(user.id);
            const vacation = await vacationFactory.create(vacationData);

            const response = await request.put(`/vacations/${vacation}`);

            expect(response.body.errors).toContainEqual({
                message: 'Should not be empty',
                param: 'startDate'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Date must be in ISO8601 format(YYYY-MM-DD)',
                param: 'startDate'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Should not be empty',
                param: 'endDate'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Date must be in ISO8601 format(YYYY-MM-DD)',
                param: 'endDate'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns BAD REQUEST sending invalid data as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });
            const vacationData = await vacationFactory.generate(user.id);
            const vacation = await vacationFactory.create(vacationData);

            const wrongVacationData = {};
            wrongVacationData.userId = 'wrongUserData';
            wrongVacationData.startDate = 'WrongDate';
            wrongVacationData.endDate = 'WrongDate';

            const response = await request
                .put(`/vacations/${vacation}`)
                .send(wrongVacationData);

            expect(response.body.errors).toContainEqual({
                message: 'Date must be in ISO8601 format(YYYY-MM-DD)',
                param: 'startDate'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Date must be in ISO8601 format(YYYY-MM-DD)',
                param: 'endDate'
            });

            expect(response.body.errors).toContainEqual({
                message: 'User doesnt exist',
                param: 'userId'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns BAD REQUEST when VACATION ends before starts as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });

            const contractData = await contractFactory.generate(user.id);
            await contractFactory.create(contractData);

            const vacationData = await vacationFactory.generate(user.id);
            vacationData.startDate = contractData.startDate;
            vacationData.endDate = contractData.endDate;

            const vacation = await vacationFactory.create(vacationData);

            const fakeStartDate = vacationData.endDate;
            vacationData.endDate = vacationData.startDate;
            vacationData.startDate = fakeStartDate;

            const response = await request
                .put(`/vacations/${vacation.id}`)
                .send(vacationData);

            expect(response.body.errors).toContainEqual({
                message: 'Start Date must be before end',
                param: 'startDate'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns UNAUTHORIZED as NOT LOGGED IN', async () => {
            const vacationData = await vacationFactory.generate(user.id);
            const vacation = await vacationFactory.create(vacationData);

            const response = await request
                .put(`/vacations/${vacation.id}`)
                .send(vacationData);

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });
    });
});
