/*
 * @group createContract
 */

import * as dayjs from 'dayjs';
import { faker } from '@faker-js/faker';

import { conf } from '@/config';
import { post } from '@test/methods/post';
import { Routes } from '@/types/enums/Routes';
import { UsersFactory } from '@test/factories/user.factory';
import { badRequestAssertion } from '@test/assertion/badRequest';
import { noPasswordAssertion } from '@test/assertion/noPassword';
import { ContractsFactory } from '@test/factories/contracts.factory';
import { CountVacationDaysService } from '@/services/VacationDays/CountVacationDaysService';

const url = `/${conf.api.prefix}/${Routes.CONTRACTS}`;

describe('Index User Controller (e2e)', () => {
    describe(`${url} (GET)`, () => {
        it('Creates new CONTRACT sending CORRECT DATA', async () => {
            const user = await UsersFactory.create();
            const contract = ContractsFactory.generate(user);

            const { status, body } = await post({ url, payload: contract });

            expect(status).toBe(201);

            expect(body).toEqual(
                expect.objectContaining({
                    id: contract.id,
                    position: contract.position,
                    user: {
                        id: user.id
                    },
                    vacationDaysPerYear: contract.vacationDaysPerYear,
                    vacationDays: CountVacationDaysService.countVacationDays({
                        vacationDaysPerYear: contract.vacationDaysPerYear,
                        startDate: contract.startDate,
                        endDate: contract.endDate
                    })
                })
            );

            dayjs(body.startDate).isSame(contract.startDate, 'day');
            dayjs(body.endDate).isSame(contract.endDate, 'day');

            noPasswordAssertion(body);
            noPasswordAssertion(body.user);
        });

        it('BAD REQUEST sending NOT EXISTING USER_ID', async () => {
            const user = UsersFactory.generate();
            const contract = ContractsFactory.generate(user);

            const { status, body } = await post({ url, payload: contract });

            expect(status).toBe(400);

            const expectedMessage = [
                {
                    field: 'user',
                    error: i18nService.translate('errors.userDoesntExist')
                }
            ];

            badRequestAssertion(status, body, expectedMessage);
        });

        it('BAD REQUEST sending NOT EXISTING USER_ID in Selected Language', async () => {
            const user = UsersFactory.generate();
            const contract = ContractsFactory.generate(user);

            const { status, body } = await post({
                url: `${url}?lang=pl`,
                payload: contract
            });
            expect(status).toBe(400);

            const expectedMessage = [
                {
                    field: 'user',
                    error: i18nService.translate('errors.userDoesntExist', {
                        lang: 'pl'
                    })
                }
            ];

            badRequestAssertion(status, body, expectedMessage);
        });

        it('BAD REQUEST when START_DATE is AFTER END_DATE', async () => {
            const user = await UsersFactory.create();
            const contract = ContractsFactory.generate(user);

            contract.endDate = faker.date.past();
            contract.startDate = faker.date.future();

            const { status, body } = await post({ url, payload: contract });

            expect(status).toBe(400);

            const expectedMessage = [
                {
                    error: i18nService.translate(
                        'errors.endDateShouldBeAfterStartDate'
                    ),
                    field: 'startDate'
                },
                {
                    field: 'endDate',
                    error: i18nService.translate(
                        'errors.startDateShouldBeBeforeEndDate'
                    )
                }
            ];

            badRequestAssertion(status, body, expectedMessage);
        });

        it('BAD REQUEST when USER has overlapping contract with the same start and end dates', async () => {
            const user = await UsersFactory.create();
            const contract = await ContractsFactory.create(user);

            const { status, body } = await post({ url, payload: contract });

            expect(status).toBe(400);

            const expectedMessage = [
                {
                    error: i18nService.translate('errors.overlappingContract'),
                    field: 'user'
                }
            ];

            badRequestAssertion(status, body, expectedMessage);
        });

        it('BAD REQUEST when USER has overlapping contract with start date BEFORE and end date AFTER (Shorter Contract)', async () => {
            const user = await UsersFactory.create();
            const contract = await ContractsFactory.create(user);

            const startDate = dayjs(contract.startDate).subtract(2, 'day');
            const endDate = dayjs(contract.endDate).add(2, 'day');

            const { status, body } = await post({
                url,
                payload: { ...contract, startDate, endDate }
            });

            expect(status).toBe(400);

            const expectedMessage = [
                {
                    error: i18nService.translate('errors.overlappingContract'),
                    field: 'user'
                }
            ];

            badRequestAssertion(status, body, expectedMessage);
        });

        it('BAD REQUEST when USER has overlapping contract with start date AFTER and end date BEFORE (Longer Contract)', async () => {
            const user = await UsersFactory.create();
            const contract = await ContractsFactory.create(user);

            const startDate = dayjs(contract.startDate).add(2, 'day');
            const endDate = dayjs(contract.endDate).subtract(2, 'day');

            const { status, body } = await post({
                url,
                payload: { ...contract, startDate, endDate }
            });

            expect(status).toBe(400);

            const expectedMessage = [
                {
                    error: i18nService.translate('errors.overlappingContract'),
                    field: 'user'
                }
            ];

            badRequestAssertion(status, body, expectedMessage);
        });

        it('BAD REQUEST when USER has overlapping contract (Only some days are overlapping)', async () => {
            const user = await UsersFactory.create();
            const contract = await ContractsFactory.create(user);

            const startDate = dayjs(contract.startDate).subtract(2, 'day');
            const endDate = dayjs(contract.startDate).subtract(2, 'day');

            const { status, body } = await post({
                url,
                payload: { ...contract, startDate, endDate }
            });

            expect(status).toBe(400);

            const expectedMessage = [
                {
                    error: i18nService.translate('errors.overlappingContract'),
                    field: 'user'
                }
            ];

            badRequestAssertion(status, body, expectedMessage);
        });

        it('BAD REQUEST sending NO DATA', async () => {
            const { status, body } = await post({ url });

            expect(status).toBe(400);

            const expectedMessage = [
                {
                    field: 'position',
                    error: i18nService.translate('errors.notEmpty')
                },
                {
                    field: 'startDate',
                    error: [
                        i18nService.translate('errors.notEmpty'),
                        i18nService.translate('errors.mustBeValidDate')
                    ].join(', ')
                },
                {
                    field: 'endDate',
                    error: [
                        i18nService.translate('errors.notEmpty'),
                        i18nService.translate('errors.mustBeValidDate')
                    ].join(', ')
                },
                {
                    field: 'user',
                    error: i18nService.translate('errors.userDoesntExist')
                },
                {
                    field: 'vacationDaysPerYear',
                    error: [
                        i18nService.translate('errors.notEmpty'),
                        i18nService.translate('errors.mustBeInteger')
                    ].join(', ')
                }
            ];

            badRequestAssertion(status, body, expectedMessage);
        });

        it('BAD REQUEST sending NO DATA, dialogs in SELECTED LANGUAGE', async () => {
            const selectedLanguage = 'pl';
            const { status, body } = await post({
                url: `${url}?lang=${selectedLanguage}`
            });

            expect(status).toBe(400);

            const expectedMessage = [
                {
                    field: 'position',
                    error: i18nService.translate('errors.notEmpty', {
                        lang: 'pl'
                    })
                },
                {
                    field: 'startDate',
                    error: [
                        i18nService.translate('errors.notEmpty', {
                            lang: 'pl'
                        }),
                        i18nService.translate('errors.mustBeValidDate', {
                            lang: 'pl'
                        })
                    ].join(', ')
                },
                {
                    field: 'endDate',
                    error: [
                        i18nService.translate('errors.notEmpty', {
                            lang: 'pl'
                        }),
                        i18nService.translate('errors.mustBeValidDate', {
                            lang: 'pl'
                        })
                    ].join(', ')
                },
                {
                    field: 'user',
                    error: i18nService.translate('errors.userDoesntExist', {
                        lang: 'pl'
                    })
                },
                {
                    field: 'vacationDaysPerYear',
                    error: [
                        i18nService.translate('errors.notEmpty', {
                            lang: 'pl'
                        }),
                        i18nService.translate('errors.mustBeInteger', {
                            lang: 'pl'
                        })
                    ].join(', ')
                }
            ];

            badRequestAssertion(status, body, expectedMessage);
        });
    });
});
