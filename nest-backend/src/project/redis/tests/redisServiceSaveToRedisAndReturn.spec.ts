/*
 * @group redis
 * @group RedisService
 */

import { faker } from '@faker-js/faker';

import { RedisService } from '@/project/redis/RedisService';

async function next(data: unknown) {
    return data;
}

describe('Redis Service', () => {
    describe('saveToRedisAndReturn', () => {
        it('saved data is available for read (data is json), sending part of key', async () => {
            const random = faker.datatype.json();
            const name = faker.animal.rodent();

            const generateKeyA = RedisService.generateKey({
                name,
                toHash: random
            });

            const result = await RedisService.saveToRedisAndReturn(
                generateKeyA,
                next,
                random
            );

            const dataInRedis = await RedisService.read(generateKeyA);

            expect(dataInRedis).toStrictEqual(result);
            expect(dataInRedis).toStrictEqual(random);
        });

        it('saved data is available for read (data is []), sending part of key', async () => {
            const random = [];
            const name = faker.animal.rodent();

            const generateKeyA = RedisService.generateKey({
                name,
                toHash: random
            });

            const result = await RedisService.saveToRedisAndReturn(
                generateKeyA,
                next,
                random
            );

            const dataInRedis = await RedisService.read(generateKeyA);

            expect(dataInRedis).toStrictEqual(result);
            expect(dataInRedis).toStrictEqual(random);
        });

        it('saved data is available for read (data is []), sending full key', async () => {
            const random = [];
            const name = faker.animal.rodent();

            const generateKeyA = RedisService.generateKey({
                name,
                toHash: random
            });

            const result = await RedisService.saveToRedisAndReturn(
                generateKeyA,
                next,
                random
            );

            const dataInRedis = await RedisService.read(generateKeyA);

            expect(dataInRedis).toStrictEqual(result);
            expect(dataInRedis).toStrictEqual(random);
        });
    });
});
