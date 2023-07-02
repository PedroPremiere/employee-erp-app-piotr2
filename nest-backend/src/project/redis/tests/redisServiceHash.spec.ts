/*
 * @group redis
 * @group RedisService
 */

import { faker } from '@faker-js/faker';

import { RedisService } from '@/project/redis/RedisService';

describe('Redis Service', () => {
    describe('hash', () => {
        describe('The same Result for the same input', () => {
            it('generates the same hash every time when Input is JSON', async () => {
                const random = faker.datatype.json();

                const hashA = RedisService.hash(random);
                const hashB = RedisService.hash(random);

                expect(hashA).toBe(hashB);
            });

            it('generates the same hash every time when Input is STRING', async () => {
                const random = faker.datatype.string();

                const hashA = RedisService.hash(random);
                const hashB = RedisService.hash(random);

                expect(hashA).toBe(hashB);
            });

            it('generates the same hash every time when Input is EMPTY ARRAY', async () => {
                const random = [];

                const hashA = RedisService.hash(random);
                const hashB = RedisService.hash(random);

                expect(hashA).toBe(hashB);
            });

            it('generates the same hash every time when Input is ARRAY OF STRINGS', async () => {
                const random = [
                    faker.datatype.string(),
                    faker.datatype.string()
                ];

                const hashA = RedisService.hash(random);
                const hashB = RedisService.hash(random);

                expect(hashA).toBe(hashB);
            });

            it('generates the same hash every time when Input is ARRAY OF MANY TYPES', async () => {
                const random = [
                    faker.datatype.string(),
                    faker.datatype.json(),
                    faker.datatype.number()
                ];

                const hashA = RedisService.hash(random);
                const hashB = RedisService.hash(random);

                expect(hashA).toBe(hashB);
            });

            it('generates the same hash every time when Input is NUMBER', async () => {
                const random = faker.datatype.number();

                const hashA = RedisService.hash(random);
                const hashB = RedisService.hash(random);

                expect(hashA).toBe(hashB);
            });

            it('generates the same hash every time when NO Input', async () => {
                const hashA = RedisService.hash();
                const hashB = RedisService.hash();

                expect(hashA).toBe(hashB);
            });
        });
        describe('Different Result for the different input', () => {
            it('generates the Different hash every time', async () => {
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

                const hashes = [
                    RedisService.hash(randomA),
                    RedisService.hash(randomB),
                    RedisService.hash(randomC),
                    RedisService.hash(randomD),
                    RedisService.hash(randomE),
                    RedisService.hash(randomF),
                    RedisService.hash()
                ];

                for (let i = 0; i < hashes.length; i++) {
                    for (let j = 0; j < hashes.length; j++) {
                        if (j !== i) {
                            expect(hashes[i]).not.toBe(hashes[j]);
                        }
                    }
                }
            });
        });
    });
});
