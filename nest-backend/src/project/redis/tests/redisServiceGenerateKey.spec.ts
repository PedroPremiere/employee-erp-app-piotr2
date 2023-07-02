/*
 * @group redis
 * @group RedisService
 */

import { faker } from '@faker-js/faker';

import { RedisService } from '@/project/redis/RedisService';

describe('Redis Service', () => {
    describe('generateKey', () => {
        describe('Result is in name.hash format', () => {
            const random = faker.datatype.json();
            const name = faker.animal.rodent();

            const hash = RedisService.hash(random);

            const generateKeyA = RedisService.generateKey({
                name,
                toHash: random
            });

            expect(generateKeyA).toBe(`${name}.${hash}`);
        });

        describe('The same Result for the same input', () => {
            it('generates the same generateKey every time when Input is JSON', async () => {
                const random = faker.datatype.json();
                const name = faker.animal.rodent();

                const generateKeyA = RedisService.generateKey({
                    name,
                    toHash: random
                });
                const generateKeyB = RedisService.generateKey({
                    name,
                    toHash: random
                });

                expect(generateKeyA).toBe(generateKeyB);
            });

            it('generates the same generateKey every time when Input is STRING', async () => {
                const random = faker.datatype.string();
                const name = faker.animal.rodent();

                const generateKeyA = RedisService.generateKey({
                    name,
                    toHash: random
                });
                const generateKeyB = RedisService.generateKey({
                    name,
                    toHash: random
                });

                expect(generateKeyA).toBe(generateKeyB);
            });

            it('generates the same generateKey every time when Input is EMPTY ARRAY', async () => {
                const random = [];
                const name = faker.animal.rodent();

                const generateKeyA = RedisService.generateKey({
                    name,
                    toHash: random
                });
                const generateKeyB = RedisService.generateKey({
                    name,
                    toHash: random
                });

                expect(generateKeyA).toBe(generateKeyB);
            });

            it('generates the same generateKey every time when Input is ARRAY OF STRINGS', async () => {
                const random = [
                    faker.datatype.string(),
                    faker.datatype.string()
                ];

                const name = faker.animal.rodent();

                const generateKeyA = RedisService.generateKey({
                    name,
                    toHash: random
                });
                const generateKeyB = RedisService.generateKey({
                    name,
                    toHash: random
                });

                expect(generateKeyA).toBe(generateKeyB);
            });

            it('generates the same generateKey every time when Input is ARRAY OF MANY TYPES', async () => {
                const random = [
                    faker.datatype.string(),
                    faker.datatype.json(),
                    faker.datatype.number()
                ];

                const name = faker.animal.rodent();

                const generateKeyA = RedisService.generateKey({
                    name,
                    toHash: random
                });
                const generateKeyB = RedisService.generateKey({
                    name,
                    toHash: random
                });

                expect(generateKeyA).toBe(generateKeyB);
            });

            it('generates the same generateKey every time when Input is NUMBER', async () => {
                const random = faker.datatype.number();
                const name = faker.animal.rodent();

                const generateKeyA = RedisService.generateKey({
                    name,
                    toHash: random
                });
                const generateKeyB = RedisService.generateKey({
                    name,
                    toHash: random
                });

                expect(generateKeyA).toBe(generateKeyB);
            });

            it('generates the same generateKey every time when NO Input', async () => {
                const name = faker.animal.rodent();
                const generateKeyA = RedisService.generateKey({
                    name
                });
                const generateKeyB = RedisService.generateKey({
                    name
                });

                expect(generateKeyA).toBe(generateKeyB);
            });
        });
        describe('Different Result for the different input', () => {
            it('generates the Different generateKey every time', async () => {
                const name = faker.animal.rodent();

                const randomA = faker.datatype.number();
                const randomB = [
                    faker.datatype.string(),
                    faker.datatype.json(),
                    faker.datatype.number()
                ];
                const randomC = [
                    faker.datatype.string(),
                    faker.datatype.string()
                ];

                const randomD = [];

                const randomE = faker.datatype.string();

                const randomF = faker.datatype.json();

                const generateKeyes = [
                    RedisService.generateKey({
                        name,
                        toHash: randomA
                    }),
                    RedisService.generateKey({
                        name,
                        toHash: randomB
                    }),
                    RedisService.generateKey({
                        name,
                        toHash: randomC
                    }),
                    RedisService.generateKey({
                        name,
                        toHash: randomD
                    }),
                    RedisService.generateKey({
                        name,
                        toHash: randomE
                    }),
                    RedisService.generateKey({
                        name,
                        toHash: randomF
                    }),
                    RedisService.generateKey({
                        name
                    })
                ];

                for (let i = 0; i < generateKeyes.length; i++) {
                    for (let j = 0; j < generateKeyes.length; j++) {
                        if (j !== i) {
                            expect(generateKeyes[i]).not.toBe(generateKeyes[j]);
                        }
                    }
                }
            });
        });
    });
});
