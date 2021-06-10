const { StatusCodes } = require('http-status-codes');
const app = require('../../../index');
const request = require('supertest-session')(app);
const userFactory = require('../../factories/User');
const vacationFactory = require('../../factories/Vacation');
const truncateDatabase = require('../../helpers/truncate');
const roleSeeder = require('../../helpers/roleSeeder');

let userData;
let adminData;
let admin;
let user;
let vacation;
let vacationData;
let adminVacationData;
let adminVacation;

describe('VACATION', () => {
    describe('GET /vacations/:id', () => {
        beforeAll(async () => {
            await truncateDatabase();

            const { adminRole, userRole } = await roleSeeder();

            userData = userFactory.generate();
            user = await userFactory.create(userData);
            user.addRole(userRole.id);

            adminData = userFactory.generate();
            admin = await userFactory.create(adminData);
            admin.addRole(adminRole.id);

            vacationData = await vacationFactory.generate(user.id);
            vacation = await vacationFactory.create(vacationData);

            adminVacationData = await vacationFactory.generate(admin.id);
            adminVacation = await vacationFactory.create(adminVacationData);
        });

        afterEach(async () => {
            await request.post('/auth/logout');
        });

        it('returns OK when VACATION exists as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });

            const response = await request.get(`/vacations/${vacation.id}`);

            expect(response.body).toEqual(
                expect.objectContaining(vacationData)
            );

            expect(response.status).toBe(StatusCodes.OK);
        });

        it('returns OK when VACATION belongs to USER as USER', async () => {
            const { email, password } = userData;
            await request.post('/auth/login').send({ email, password });

            const { body, status } = await request.get(
                `/vacations/${vacation.id}`
            );

            expect(body).toEqual(expect.objectContaining(vacationData));

            expect(status).toBe(StatusCodes.OK);
        });

        it('returns NOT_FOUND when VACATION does not exist as ADMIN', async () => {
            const { email, password } = adminData;
            await request.post('/auth/login').send({ email, password });

            const response = await request.get('/vacations/not-found');

            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        });

        it('returns NOT_FOUND when VACATION does not exist as USER ', async () => {
            const { email, password } = userData;

            await request.post('/auth/login').send({ email, password });

            const response = await request.get('/vacations/not-found');

            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        });

        it('returns FORBIDDEN when VACATION doesnt belong to USER as USER', async () => {
            const { email, password } = userData;
            await request.post('/auth/login').send({ email, password });

            const response = await request.get(
                `/vacations/${adminVacation.id}`
            );

            expect(response.status).toBe(StatusCodes.FORBIDDEN);
        });

        it('returns UNAUTHORIZED as NOT-LOGGED-IN', async () => {
            const response = await request.get(`/vacations/${vacationData.id}`);

            expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        });
    });
});
