const { StatusCodes } = require('http-status-codes');
const app = require('../../../index');
const request = require('supertest-session')(app);
const userFactory = require('../../factories/User');
const contractFactory = require('../../factories/Contract');
const truncateDatabase = require('../../helpers/truncate');
const roleSeeder = require('../../helpers/roleSeeder');

let userData;
let adminData;
let admin;
let user;
let contract;
let contractData;
let adminContract;

describe('Contracts', () => {
    describe('GET /contracts/:id', () => {
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

        it('returns OK when CONTRACT exists as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });

            const response = await request.get(`/contracts/${contractData.id}`);

            expect(response.body).toEqual(
                expect.objectContaining(contractData)
            );

            expect(response.status).toBe(StatusCodes.OK);
        });

        it('returns OK when CONTRACT belongs to USER as USER', async () => {
            const { email, password } = userData;
            await request.post('/auth/login').send({ email, password });

            const response = await request.get(`/contracts/${contract.id}`);

            expect(response.body).toEqual(
                expect.objectContaining(contractData)
            );

            expect(response.status).toBe(StatusCodes.OK);
        });

        it('returns NOT_FOUND when CONTRACT does not exist as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });

            const response = await request.get('/contracts/not-found');

            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        });

        it('returns NOT_FOUND when CONTRACT does not exist as USER ', async () => {
            const { email, password } = userData;

            await request.post('/auth/login').send({ email, password });

            const response = await request.get('/contracts/not-found');

            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        });

        it('returns FORBIDDEN when CONTRACT doesnt belong to USER as USER', async () => {
            const { email, password } = userData;
            await request.post('/auth/login').send({ email, password });

            const response = await request.get(
                `/contracts/${adminContract.id}`
            );

            expect(response.status).toBe(StatusCodes.FORBIDDEN);
        });

        it('returns UNAUTHORIZED as NOT-LOGGED-IN', async () => {
            const response = await request.get(`/contracts/${userData.id}`);

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });
    });
});
