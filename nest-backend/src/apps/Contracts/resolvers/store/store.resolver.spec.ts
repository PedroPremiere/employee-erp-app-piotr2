/*
 * @group store
 * @group contract
 * @group createContract
 * @group storeContract
 */

import { post } from '@test/methods/post';
import { UserFactory } from '@/apps/User/factories/UserFactory';
import { ContractsFactory } from '@/db/factories/ContractsFactory';
import { faker } from '@faker-js/faker';
import * as dayjs from 'dayjs';
import { translate } from '@test/helpers/translate';

const url = `/graphql`;
const operation = 'storeContract';

const fields = [
    'id',
    'createdAt',
    'updatedAt',
    'position',
    'startDate',
    'endDate',
    'vacationDaysPerYear'
];

describe('Store Contract (e2e)', () => {
    describe(`${url} (GET)`, () => {
        it('Creates new Contract sending CORRECT DATA', async () => {
            const user = await UserFactory.create();
            const contract = ContractsFactory.generate(user.id);

            const payload = graph.mutation({
                operation,
                variables: {
                    ownerId: {
                        value: user.id,
                        required: true
                    },
                    position: {
                        value: contract.position,
                        required: true
                    },
                    startDate: {
                        value: contract.startDate.toISOString(),
                        required: true
                    },
                    endDate: {
                        value: contract.endDate.toISOString(),
                        required: true
                    },
                    vacationDaysPerYear: {
                        value: contract.vacationDaysPerYear,
                        required: true
                    }
                },
                fields
            });

            const { status, body } = await post({ url, payload });

            const { data } = body;

            expect(status).toBe(200);

            const contractInDb = await prismaService.contract.findFirst({
                where: { id: data[operation].id }
            });

            expect(contractInDb).toEqual(
                expect.objectContaining({
                    id: data[operation].id,
                    position: contract.position,
                    startDate: contract.startDate,
                    endDate: contract.endDate,
                    vacationDaysPerYear: contract.vacationDaysPerYear
                })
            );

            expect(data[operation]).toEqual(
                expect.objectContaining({
                    id: contractInDb.id
                })
            );
        });

        it('BAD REQUEST when NoData', async () => {
            const payload = graph.mutation({
                operation,
                variables: {},
                fields
            });

            const { status, body } = await post({
                url,
                payload
            });

            expect(status).toBe(200);

            const { errors } = body.errors[0];

            const expectedDialogPosition = [translate('notEmpty', 'en')];

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'position',
                    messages: expect.arrayContaining(expectedDialogPosition)
                })
            );

            const expectedDialogDates = [
                translate('notEmpty', 'en'),
                translate('mustBeValidDate', 'en')
            ];

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'startDate',
                    messages: expect.arrayContaining(expectedDialogDates)
                })
            );

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'endDate',
                    messages: expect.arrayContaining(expectedDialogDates)
                })
            );

            const expectedDialogUser = [translate('userDoesntExist', 'en')];

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'ownerId',
                    messages: expect.arrayContaining(expectedDialogUser)
                })
            );

            const expectedDialogVacationDaysPerYear = [
                translate('notEmpty', 'en'),
                translate('mustBeInteger', 'en')
            ];

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'vacationDaysPerYear',
                    messages: expect.arrayContaining(
                        expectedDialogVacationDaysPerYear
                    )
                })
            );
        });

        it('BAD REQUEST when NoData in Selected Language', async () => {
            const lang = 'pl';
            const payload = graph.mutation({
                operation,
                variables: {},
                fields
            });

            const { status, body } = await post({
                url: `${url}?lang=${lang}`,
                payload
            });

            expect(status).toBe(200);

            const { errors } = body.errors[0];

            const expectedDialogPosition = [translate('notEmpty', lang)];

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'position',
                    messages: expect.arrayContaining(expectedDialogPosition)
                })
            );

            const expectedDialogDates = [
                translate('notEmpty', lang),
                translate('mustBeValidDate', lang)
            ];

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'startDate',
                    messages: expect.arrayContaining(expectedDialogDates)
                })
            );

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'endDate',
                    messages: expect.arrayContaining(expectedDialogDates)
                })
            );

            const expectedDialogUser = [translate('userDoesntExist', lang)];

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'ownerId',
                    messages: expect.arrayContaining(expectedDialogUser)
                })
            );

            const expectedDialogVacationDaysPerYear = [
                translate('notEmpty', lang),
                translate('mustBeInteger', lang)
            ];

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'vacationDaysPerYear',
                    messages: expect.arrayContaining(
                        expectedDialogVacationDaysPerYear
                    )
                })
            );
        });

        it('BAD REQUEST sending NOT EXISTING USER_ID', async () => {
            const lang = 'en';
            const contract = ContractsFactory.generate('not existing id');

            const payload = graph.mutation({
                operation,
                variables: {
                    ownerId: {
                        value: 'not existing user',
                        required: true
                    },
                    position: {
                        value: contract.position,
                        required: true
                    },
                    startDate: {
                        value: contract.startDate.toISOString(),
                        required: true
                    },
                    endDate: {
                        value: contract.endDate.toISOString(),
                        required: true
                    },
                    vacationDaysPerYear: {
                        value: contract.vacationDaysPerYear,
                        required: true
                    }
                },
                fields
            });

            const { status, body } = await post({
                url: `${url}?lang=${lang}`,
                payload
            });

            expect(status).toBe(200);

            const { errors } = body.errors[0];

            const expectedDialogUser = [translate('userDoesntExist', lang)];

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'ownerId',
                    messages: expect.arrayContaining(expectedDialogUser)
                })
            );
        });

        it('BAD REQUEST when START_DATE is AFTER END_DATE', async () => {
            const user = await UserFactory.create();
            const contract = ContractsFactory.generate(user.id);

            contract.endDate = faker.date.past();
            contract.startDate = faker.date.future();

            const payload = graph.mutation({
                operation,
                variables: {
                    ownerId: {
                        value: user.id,
                        required: true
                    },
                    position: {
                        value: contract.position,
                        required: true
                    },
                    startDate: {
                        value: contract.startDate.toISOString(),
                        required: true
                    },
                    endDate: {
                        value: contract.endDate.toISOString(),
                        required: true
                    },
                    vacationDaysPerYear: {
                        value: contract.vacationDaysPerYear,
                        required: true
                    }
                },
                fields
            });

            const { status, body } = await post({ url, payload });

            expect(status).toBe(200);

            const { errors } = body.errors[0];

            const expectedDialogDatesStartDate = [
                translate('endDateShouldBeAfterStartDate', 'en')
            ];
            const expectedDialogDatesEndDate = [
                translate('startDateShouldBeBeforeEndDate', 'en')
            ];

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'startDate',
                    messages: expect.arrayContaining(
                        expectedDialogDatesStartDate
                    )
                })
            );

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'endDate',
                    messages: expect.arrayContaining(expectedDialogDatesEndDate)
                })
            );
        });

        it('BAD REQUEST when USER has overlapping contract with the same start and end dates', async () => {
            const user = await UserFactory.create();
            const contract = await ContractsFactory.create(user.id);

            const payload = graph.mutation({
                operation,
                variables: {
                    ownerId: {
                        value: user.id,
                        required: true
                    },
                    position: {
                        value: contract.position,
                        required: true
                    },
                    startDate: {
                        value: contract.startDate.toISOString(),
                        required: true
                    },
                    endDate: {
                        value: contract.endDate.toISOString(),
                        required: true
                    },
                    vacationDaysPerYear: {
                        value: contract.vacationDaysPerYear,
                        required: true
                    }
                },
                fields
            });

            const { status, body } = await post({ url, payload });

            const { errors } = body.errors[0];

            expect(status).toBe(200);

            const expectedDialog = [translate('overlappingContract', 'en')];

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'ownerId',
                    messages: expect.arrayContaining(expectedDialog)
                })
            );
        });

        it('BAD REQUEST when USER has overlapping contract with start date BEFORE and end date AFTER (Shorter Contract)', async () => {
            const user = await UserFactory.create();
            const contract = await ContractsFactory.create(user.id);

            const startDate = dayjs(contract.startDate).subtract(2, 'day');
            const endDate = dayjs(contract.endDate).add(2, 'day');

            const payload = graph.mutation({
                operation,
                variables: {
                    ownerId: {
                        value: user.id,
                        required: true
                    },
                    position: {
                        value: contract.position,
                        required: true
                    },
                    startDate: {
                        value: startDate.toISOString(),
                        required: true
                    },
                    endDate: {
                        value: endDate.toISOString(),
                        required: true
                    },
                    vacationDaysPerYear: {
                        value: contract.vacationDaysPerYear,
                        required: true
                    }
                },
                fields
            });

            const { status, body } = await post({ url, payload });

            const { errors } = body.errors[0];

            expect(status).toBe(200);

            const expectedDialog = [translate('overlappingContract', 'en')];

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'ownerId',
                    messages: expect.arrayContaining(expectedDialog)
                })
            );
        });

        it('BAD REQUEST when USER has overlapping contract with start date AFTER and end date BEFORE (Longer Contract)', async () => {
            const user = await UserFactory.create();
            const contract = await ContractsFactory.create(user.id);

            const startDate = dayjs(contract.startDate).add(2, 'day');
            const endDate = dayjs(contract.endDate).subtract(2, 'day');

            const payload = graph.mutation({
                operation,
                variables: {
                    ownerId: {
                        value: user.id,
                        required: true
                    },
                    position: {
                        value: contract.position,
                        required: true
                    },
                    startDate: {
                        value: startDate.toISOString(),
                        required: true
                    },
                    endDate: {
                        value: endDate.toISOString(),
                        required: true
                    },
                    vacationDaysPerYear: {
                        value: contract.vacationDaysPerYear,
                        required: true
                    }
                },
                fields
            });

            const { status, body } = await post({ url, payload });

            const { errors } = body.errors[0];

            expect(status).toBe(200);

            const expectedDialog = [translate('overlappingContract', 'en')];

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'ownerId',
                    messages: expect.arrayContaining(expectedDialog)
                })
            );
        });

        it('BAD REQUEST when USER has overlapping contract (Only some days are overlapping)', async () => {
            const user = await UserFactory.create();
            const contract = await ContractsFactory.create(user.id);

            const startDate = dayjs(contract.startDate).subtract(2, 'day');
            const endDate = dayjs(contract.startDate).add(2, 'day');

            const payload = graph.mutation({
                operation,
                variables: {
                    ownerId: {
                        value: user.id,
                        required: true
                    },
                    position: {
                        value: contract.position,
                        required: true
                    },
                    startDate: {
                        value: startDate.toISOString(),
                        required: true
                    },
                    endDate: {
                        value: endDate.toISOString(),
                        required: true
                    },
                    vacationDaysPerYear: {
                        value: contract.vacationDaysPerYear,
                        required: true
                    }
                },
                fields
            });

            const { status, body } = await post({ url, payload });

            const { errors } = body.errors[0];

            expect(status).toBe(200);

            const expectedDialog = [translate('overlappingContract', 'en')];

            expect(errors).toContainEqual(
                expect.objectContaining({
                    field: 'ownerId',
                    messages: expect.arrayContaining(expectedDialog)
                })
            );
        });
    });
});
