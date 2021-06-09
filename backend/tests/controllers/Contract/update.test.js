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

const di = app.get('di');
const userRepository = di.get('repositories.user');
const contractRepository = di.get('repositories.contract');

describe('Contracts', () => {
    describe('PUT /contracts', () => {
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

        it('returns OK sending valid data as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });

            const contractData = await contractFactory.generate(user.id);
            const contract = await contractFactory.create(contractData);

            const newContractDate = await contractFactory.generate(user.id);

            const oldContractcate = await contractRepository.findById(
                contract.id
            );

            const response = await request
                .put(`/contracts/${contract.id}`)
                .send(newContractDate);

            expect(response.body).toEqual(
                expect.objectContaining({
                    endDate: newContractDate.endDate,
                    position: newContractDate.position,
                    startDate: newContractDate.startDate,
                    userId: newContractDate.userId,
                    vacationDaysPerYear: newContractDate.vacationDaysPerYear
                })
            );

            expect(response.status).toBe(StatusCodes.OK);

            const newUserDate = await userRepository.findById(user.id);
            const newVacationDays = newUserDate.vacationDays;

            const contractVacationDays = response.body.vacationDays;

            expect(newVacationDays).toBe(
                user.vacationDays -
                    (oldContractcate.vacationDays - contractVacationDays)
            );
        });

        it('returns BAD REQUEST when body section is empty as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });

            const contractData = await contractFactory.generate(user.id);
            const contract = await contractFactory.create(contractData);

            const response = await request.put(`/contracts/${contract.id}`);

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

            const contractData = await contractFactory.generate(user.id);
            const contract = await contractFactory.create(contractData);

            const newContractDate = await contractFactory.generate(user.id);

            const wrongUserData = userFactory.generate();
            newContractDate.userId = wrongUserData.id;

            newContractDate.position = null;
            newContractDate.startDate = 'WrongDate';
            newContractDate.endDate = 'WrongDate';
            newContractDate.vacationDaysPerYear = '-1.5';

            const response = await request
                .put(`/contracts/${contract.id}`)
                .send(newContractDate);

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

        it('returns BAD REQUEST when CONTRACT overlaps with other contracts (both end and start dates the same) as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });

            const contractData = await contractFactory.generate(user.id);
            const contract = await contractFactory.create(contractData);

            const existingContractData = await contractFactory.generate(
                user.id
            );

            existingContractData.startDate = dayjs(contractData.endDate)
                .add(100, 'day')
                .format('YYYY-MM-DD');

            existingContractData.endDate = dayjs(contractData.endDate)
                .add(150, 'day')
                .format('YYYY-MM-DD');

            await contractFactory.create(existingContractData);

            const response = await request
                .put(`/contracts/${contract.id}`)
                .send(existingContractData);

            expect(response.body.errors).toContainEqual({
                message: 'Contract time overlaps with other contracts',
                param: 'endDate'
            });

            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it('returns BAD REQUEST when CONTRACT ends before starts  as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });

            const contractData = await contractFactory.generate(user.id);
            const contract = await contractFactory.create(contractData);

            const fakeStartDate = contractData.endDate;

            contractData.endDate = contractData.startDate;
            contractData.startDate = fakeStartDate;

            const response = await request
                .put(`/contracts/${contract.id}`)
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

            const contractData = await contractFactory.generate(user.id);
            const contract = await contractFactory.create(contractData);

            const response = await request
                .put(`/contracts/${contract.id}`)
                .send(contractData);

            expect(response.status).toBe(StatusCodes.FORBIDDEN);
        });

        it('returns UNAUTHORIZED as NOT LOGGED IN', async () => {
            const contractData = await contractFactory.generate(user.id);
            const contract = await contractFactory.create(contractData);

            const response = await request
                .put(`/contracts/${contract.id}`)
                .send(contractData);

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });
    });
});
