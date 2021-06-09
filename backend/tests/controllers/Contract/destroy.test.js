const { StatusCodes } = require('http-status-codes');
const app = require('../../../index');
const request = require('supertest-session')(app);
const userFactory = require('../../factories/User');
const truncateDatabase = require('../../helpers/truncate');
const roleSeeder = require('../../helpers/roleSeeder');
const contractFactory = require('../../factories/Contract');

let userData;
let user;
let adminData;
let admin;
let contract;
let contractData;
let adminContract;

const di = app.get('di');
const userRepository = di.get('repositories.user');

describe('Contracts', () => {
    describe('DELETE /contracts/:id', () => {
        beforeAll(async () => {
            await truncateDatabase();

            const { adminRole, userRole } = await roleSeeder();

            userData = userFactory.generate();
            user = await userFactory.create(userData);
            user.addRole(userRole.id);

            adminData = userFactory.generate();
            admin = await userFactory.create(adminData);
            admin.addRole(adminRole.id);

            contractData = await contractFactory.generate(user.id);
            contract = await contractFactory.create(contractData);

            adminContractData = await contractFactory.generate(admin.id);
            adminContract = await contractFactory.create(adminContractData);
        });

        afterEach(async () => {
            await request.post('/auth/logout');
        });

        it('returns NO CONTENT deleting existing CONTRACT as ADMIN', async () => {
            const { email, password } = adminData;

            await request.post('/auth/login').send({ email, password });

            const deleteResponse = await request.delete(
                `/contracts/${contract.id}`
            );

            expect(deleteResponse.status).toBe(StatusCodes.NO_CONTENT);

            const getResponseContract = await request.get(
                `/contracts/${contract.id}`
            );

            expect(getResponseContract.status).toBe(StatusCodes.NOT_FOUND);

            const newUserDate = await userRepository.findById(user.id);
            const newVacationDays = newUserDate.vacationDays;

            expect(newVacationDays).toBe(
                user.vacationDays - contract.vacationDays
            );
        });

        it('returns NO CONTENT deleting non-existing CONTRACT as ADMIN', async () => {
            const { email, password } = adminData;

            await request.post('/auth/login').send({ email, password });

            const wrongUserData = userFactory.generate();

            const deleteResponse = await request.delete(
                `/contracts/${wrongUserData.id}`
            );

            expect(deleteResponse.status).toBe(StatusCodes.NO_CONTENT);
        });

        it('returns FORBIDDEN sending valid data as USER', async () => {
            const { email, password } = userData;

            await request.post('/auth/login').send({ email, password });

            const response = await request.delete(`/contracts/${contract.id}`);

            expect(response.status).toBe(StatusCodes.FORBIDDEN);
        });

        it('returns UNAUTHORIZED as NOT LOGGED IN', async () => {
            const response = await request.delete(`/contracts/${contract.id}`);

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });
    });
});
