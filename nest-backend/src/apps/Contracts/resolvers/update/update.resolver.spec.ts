/*
 * @group update
 * @group contract
 * @group updateContract
 */

import * as dayjs from 'dayjs';
import { faker } from '@faker-js/faker';

import { translate } from '@test/helpers/translate';
import { UserFactory } from '@/apps/User/factories/UserFactory';
import { graphQlMutation } from '@test/methods/graphQlMutation';
import { ContractsFactory } from '@/db/factories/ContractsFactory';

const operation = 'updateContract';

const fields = [
    'id',
    'createdAt',
    'updatedAt',
    'position',
    'startDate',
    'endDate',
    'vacationDaysPerYear',
    'ownerId'
];

describe('Store Contract (e2e)', () => {
    it('Updates Contract sending CORRECT DATA', async () => {
        const user = await UserFactory.create();
        const contract = await ContractsFactory.create(user.id);

        const newUser = await UserFactory.create();
        const newContractData = ContractsFactory.generate(newUser.id);

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                id: {
                    value: contract.id,
                    required: true
                },
                ownerId: {
                    value: newUser.id,
                    required: true
                },
                position: {
                    value: newContractData.position,
                    required: true
                },
                startDate: {
                    value: newContractData.startDate.toISOString(),
                    required: true
                },
                endDate: {
                    value: newContractData.endDate.toISOString(),
                    required: true
                },
                vacationDaysPerYear: {
                    value: newContractData.vacationDaysPerYear,
                    required: true
                }
            },
            fields
        });

        const { data } = body;

        expect(status).toBe(200);

        const contractInDb = await prismaService.contract.findFirst({
            where: { id: data[operation].id }
        });

        expect(contractInDb).toEqual(
            expect.objectContaining({
                id: data[operation].id,
                position: newContractData.position,
                startDate: newContractData.startDate,
                endDate: newContractData.endDate,
                vacationDaysPerYear: newContractData.vacationDaysPerYear,
                ownerId: newUser.id
            })
        );

        expect(data[operation]).toEqual(
            expect.objectContaining({
                id: contractInDb.id,
                position: newContractData.position,
                startDate: newContractData.startDate.toISOString(),
                endDate: newContractData.endDate.toISOString(),
                vacationDaysPerYear: newContractData.vacationDaysPerYear,
                ownerId: newUser.id
            })
        );
    });

    it('Returns NO FOUND sending NON EXISTING CONTRACT ID', async () => {
        const user = await UserFactory.create();
        const contract = ContractsFactory.generate(user.id);

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                id: {
                    value: 'non existing id',
                    required: true
                },
                ownerId: {
                    value: user.id
                },
                position: {
                    value: contract.position
                },
                startDate: {
                    value: contract.startDate.toISOString()
                },
                endDate: {
                    value: contract.endDate.toISOString()
                },
                vacationDaysPerYear: {
                    value: contract.vacationDaysPerYear
                }
            },
            fields
        });

        expect(status).toBe(200);

        const expectedDialog = i18nService.__({
            phrase: 'Not Found',
            locale: 'en'
        });

        expect(body.errors[0].message).toBe(expectedDialog);
    });

    it('Returns NO FOUND sending NON EXISTING CONTRACT ID, in selected language', async () => {
        const user = await UserFactory.create();
        const contract = ContractsFactory.generate(user.id);

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                id: {
                    value: 'non existing id',
                    required: true
                },
                ownerId: {
                    value: user.id
                },
                position: {
                    value: contract.position
                },
                startDate: {
                    value: contract.startDate.toISOString()
                },
                endDate: {
                    value: contract.endDate.toISOString()
                },
                vacationDaysPerYear: {
                    value: contract.vacationDaysPerYear
                }
            },
            fields,
            lang: 'pl'
        });

        expect(status).toBe(200);

        const expectedDialog = i18nService.__({
            phrase: 'Not Found',
            locale: 'pl'
        });

        expect(body.errors[0].message).toBe(expectedDialog);
    });

    it('BAD REQUEST when NoData', async () => {
        const { status, body } = await graphQlMutation({
            operation,
            variables: {},
            fields
        });

        expect(status).toBe(200);

        const { errors } = body.errors[0];

        const expectedDialog = [translate('notEmpty', 'en')];

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'id',
                messages: expect.arrayContaining(expectedDialog)
            })
        );
    });

    it('BAD REQUEST when NoData in Selected Language', async () => {
        const lang = 'pl';

        const { status, body } = await graphQlMutation({
            operation,
            variables: {},
            fields,
            lang
        });

        expect(status).toBe(200);

        const { errors } = body.errors[0];

        const expectedDialog = [translate('notEmpty', lang)];

        expect(errors).toContainEqual(
            expect.objectContaining({
                field: 'id',
                messages: expect.arrayContaining(expectedDialog)
            })
        );
    });

    it('BAD REQUEST sending NOT EXISTING USER_ID', async () => {
        const lang = 'en';

        const user = await UserFactory.create();
        const contract = await ContractsFactory.create(user.id);

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                id: {
                    value: contract.id,
                    required: true
                },
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
            fields,
            lang
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
        const contract = await ContractsFactory.create(user.id);

        contract.endDate = faker.date.past();
        contract.startDate = faker.date.future();

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                id: {
                    value: contract.id,
                    required: true
                },
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
                messages: expect.arrayContaining(expectedDialogDatesStartDate)
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
        const contractB = await ContractsFactory.create(user.id);

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                id: {
                    value: contract.id,
                    required: true
                },
                ownerId: {
                    value: user.id,
                    required: true
                },
                position: {
                    value: contract.position,
                    required: true
                },
                startDate: {
                    value: contractB.startDate.toISOString(),
                    required: true
                },
                endDate: {
                    value: contractB.endDate.toISOString(),
                    required: true
                },
                vacationDaysPerYear: {
                    value: contract.vacationDaysPerYear,
                    required: true
                }
            },
            fields
        });

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
        const contractB = await ContractsFactory.create(user.id);

        const startDate = dayjs(contractB.startDate).subtract(2, 'day');
        const endDate = dayjs(contractB.endDate).add(2, 'day');

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                id: {
                    value: contract.id,
                    required: true
                },
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
        const contractB = await ContractsFactory.create(user.id);

        const startDate = dayjs(contractB.startDate).add(2, 'day');
        const endDate = dayjs(contractB.endDate).subtract(2, 'day');

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                id: {
                    value: contract.id,
                    required: true
                },
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
        const contractB = await ContractsFactory.create(user.id);

        const startDate = dayjs(contractB.startDate).subtract(2, 'day');
        const endDate = dayjs(contractB.startDate).add(2, 'day');

        const { status, body } = await graphQlMutation({
            operation,
            variables: {
                id: {
                    value: contract.id,
                    required: true
                },
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
