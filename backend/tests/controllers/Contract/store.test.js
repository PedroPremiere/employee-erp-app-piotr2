const { StatusCodes } = require('http-status-codes');
const app = require('../../../index');
const request = require('supertest-session')(app);
const userFactory = require('../../factories/User');
const truncateDatabase = require('../../helpers/truncate');
const roleSeeder = require('../../helpers/roleSeeder');
const contractFactory = require('../../factories/Contract');
const dayjs = require('dayjs');

let userData;
let user;
let adminData;
let contractData;

const di = app.get('di');
const userRepository = di.get('repositories.user');

describe('Contracts', () => {
    describe('POST /contracts', () => {
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

        it('returns CREATED sending valid data as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });
            contractData = await contractFactory.generate(user.id);

            const response = await request
                .post('/contracts')
                .send(contractData);

            const contract = contractFactory.build(contractData);

            expect(response.body).toEqual(
                expect.objectContaining({
                    endDate: contract.endDate,
                    position: contract.position,
                    startDate: contract.startDate,
                    userId: contract.userId,
                    vacationDaysPerYear: contract.vacationDaysPerYear
                })
            );

            expect(response.status).toBe(StatusCodes.CREATED);

            const newUserDate = await userRepository.findById(user.id);
            const newVacationDays = newUserDate.vacationDays;

            const contractVacationDays = response.body.vacationDays;

            expect(newVacationDays).toBe(
                user.vacationDays + contractVacationDays
            );
        });

        it('returns BAD REQUEST when body section is empty as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });
            contractData = await contractFactory.generate(user.id);

            const response = await request.post('/contracts');

            expect(response.body.errors).toContainEqual({
                message: 'Should not be empty',
                param: 'position'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Position must have more than 2 characters',
                param: 'position'
            });

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
                param: 'userId'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Should not be empty',
                param: 'endDate'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Date must be in ISO8601 format(YYYY-MM-DD)',
                param: 'endDate'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Vacation days per year should not be empty',
                param: 'vacationDaysPerYear'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns BAD REQUEST sending invalid data as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });
            contractData = await contractFactory.generate(user.id);

            const wrongUserData = userFactory.generate();
            contractData.userId = wrongUserData.id;

            contractData.position = null;
            contractData.startDate = 'WrongDate';
            contractData.endDate = 'WrongDate';
            contractData.vacationDaysPerYear = '-1.5';

            const response = await request
                .post('/contracts')
                .send(contractData);

            expect(response.body.errors).toContainEqual({
                message: 'User doesnt exist',
                param: 'userId'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Should not be empty',
                param: 'position'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Position must have more than 2 characters',
                param: 'position'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Date must be in ISO8601 format(YYYY-MM-DD)',
                param: 'startDate'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Date must be in ISO8601 format(YYYY-MM-DD)',
                param: 'endDate'
            });

            expect(response.body.errors).toContainEqual({
                message: 'Vacation days per year should be positive number',
                param: 'vacationDaysPerYear'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns BAD REQUEST when CONTRACT overlaps with other contracts (both end and start dates the same)  as ADMIN ', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });
            contractData = await contractFactory.generate(user.id);
            await contractFactory.create(contractData);

            const response = await request
                .post('/contracts')
                .send(contractData);

            expect(response.body.errors).toContainEqual({
                message: 'Contract time overlaps with other contracts',
                param: 'endDate'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns BAD REQUEST when CONTRACT overlaps with other contracts (but start date is before original date) as ADMIN ', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });
            contractData = await contractFactory.generate(user.id);
            await contractFactory.create(contractData);

            contractData.startDate = dayjs(contractData.startDate)
                .subtract(100, 'day')
                .format('YYYY-MM-DD');

            const response = await request
                .post('/contracts')
                .send(contractData);

            expect(response.body.errors).toContainEqual({
                message: 'Contract time overlaps with other contracts',
                param: 'endDate'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns BAD REQUEST when CONTRACT overlaps with other contracts (but end date is after original date) as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });
            contractData = await contractFactory.generate(user.id);
            await contractFactory.create(contractData);

            contractData.endDate = dayjs(contractData.endDate)
                .add(100, 'day')
                .format('YYYY-MM-DD');

            const response = await request
                .post('/contracts')
                .send(contractData);

            expect(response.body.errors).toContainEqual({
                message: 'Contract time overlaps with other contracts',
                param: 'endDate'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns BAD REQUEST when CONTRACT overlaps with other contracts (but end date is after and start date before original date)  as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });
            contractData = await contractFactory.generate(user.id);
            await contractFactory.create(contractData);

            contractData.endDate = dayjs(contractData.endDate)
                .add(100, 'day')
                .format('YYYY-MM-DD');

            contractData.startDate = dayjs(contractData.startDate)
                .subtract(100, 'day')
                .format('YYYY-MM-DD');

            const response = await request
                .post('/contracts')
                .send(contractData);

            expect(response.body.errors).toContainEqual({
                message: 'Contract time overlaps with other contracts',
                param: 'endDate'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns BAD REQUEST when CONTRACT overlaps with other contracts (but end date is before and start date after original date) as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });
            contractData = await contractFactory.generate(user.id);
            const shorterContract = contractData;

            contractData.endDate = dayjs(contractData.endDate)
                .add(100, 'day')
                .format('YYYY-MM-DD');

            contractData.startDate = dayjs(contractData.startDate)
                .subtract(100, 'day')
                .format('YYYY-MM-DD');

            await contractFactory.create(contractData);

            const response = await request
                .post('/contracts')
                .send(shorterContract);

            expect(response.body.errors).toContainEqual({
                message: 'Contract time overlaps with other contracts',
                param: 'endDate'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns BAD REQUEST when CONTRACT ends before starts as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });
            contractData = await contractFactory.generate(user.id);
            const fakeStartDate = contractData.endDate;

            contractData.endDate = contractData.startDate;
            contractData.startDate = fakeStartDate;

            const response = await request
                .post('/contracts')
                .send(contractData);

            expect(response.body.errors).toContainEqual({
                message: 'Start Date must be before end',
                param: 'startDate'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns FORBIDDEN sending valid data as USER', async () => {
            const { email, password } = userData;
            await request.post('/auth/login').send({ email, password });
            contractData = await contractFactory.generate(user.id);
            const response = await request
                .post('/contracts')
                .send(contractData);

            expect(response.status).toBe(StatusCodes.FORBIDDEN);
        });

        it('returns UNAUTHORIZED as NOT LOGGED IN', async () => {
            const contractData = await contractFactory.generate(user.id);
            const response = await request
                .post('/contracts')
                .send(contractData);

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });
    });
});
