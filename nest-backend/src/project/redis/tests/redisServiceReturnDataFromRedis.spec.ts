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
    describe('returnDataFromRedis', () => {
        it('returns data when available in redis', async () => {
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

            const dataInRedis = await RedisService.returnDataFromRedis(
                generateKeyA
            );

            expect(dataInRedis).toStrictEqual(result);
            expect(dataInRedis).toStrictEqual(random);
        });

        it('returns false when no data in redis', async () => {
            const random = faker.datatype.json();
            const name = faker.animal.rodent();

            const generateKeyA = RedisService.generateKey({
                name,
                toHash: random
            });

            const dataInRedis = await RedisService.returnDataFromRedis(
                generateKeyA
            );

            expect(dataInRedis).toBeFalsy();
        });

        it('returns false when after deleting, part key', async () => {
            const random = faker.datatype.json();
            const name = faker.animal.rodent();

            const generateKeyA = RedisService.generateKey({
                name,
                toHash: random
            });

            await RedisService.saveToRedisAndReturn(generateKeyA, next, random);

            await RedisService.delete(name);

            const dataInRedis = await RedisService.returnDataFromRedis(
                generateKeyA
            );

            expect(dataInRedis).toBeFalsy();
        });

        it('returns false when after deleting , full key', async () => {
            const random = faker.datatype.json();
            const name = faker.animal.rodent();

            const generateKeyA = RedisService.generateKey({
                name,
                toHash: random
            });

            await RedisService.saveToRedisAndReturn(generateKeyA, next, random);

            await RedisService.delete(generateKeyA);

            const dataInRedis = await RedisService.returnDataFromRedis(
                generateKeyA
            );

            expect(dataInRedis).toBeFalsy();
        });
    });
});
