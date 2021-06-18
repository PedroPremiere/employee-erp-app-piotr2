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
let adminContract;
let adminContractData;
let contractData;

describe('ME', () => {
    describe('GET auth/me', () => {
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

        it('returns OK when logged in as USER', async () => {
            const { email, password } = userData;

            await request.post('/auth/login').send({ email, password });

            const response = await request.get('/auth/me');

            expect(response.body.id).toBe(user.id);
            expect(response.body.birthDate).toBe(user.birthDate);

            expect(response.body.firstName).toBe(user.firstName);
            expect(response.body.email).toBe(user.email);

            expect(response.body.lastName).toBe(user.lastName);

            expect(response.status).toBe(StatusCodes.OK);
        });

        it('returns UNAUTHORIZED when NOT-LOGGED-IN', async () => {
            const response = await request.get('/auth/me');

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });
    });
});
