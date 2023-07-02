/*
 * @group redis
 * @group RedisService
 */

import { faker } from '@faker-js/faker';

import { RedisService } from '@/project/redis/RedisService';

describe('Redis Service', () => {
    describe('delete', () => {
        it('saved data is NOT available for read after delete (data is json), sending part of key', async () => {
            const random = faker.datatype.json();
            const name = faker.animal.rodent();

            const generateKeyA = RedisService.generateKey({
                name,
                toHash: random
            });

            await RedisService.save(generateKeyA, random);
            await RedisService.delete(name);

            const dataInRedis = await RedisService.read(generateKeyA);

            expect(dataInRedis).toBeFalsy();
        });

        it('saved data is NOT available for read after delete (data is json), sending full key', async () => {
            const random = faker.datatype.json();
            const name = faker.animal.rodent();

            const generateKeyA = RedisService.generateKey({
                name,
                toHash: random
            });

            await RedisService.save(generateKeyA, random);
            await RedisService.delete(generateKeyA);

            const dataInRedis = await RedisService.read(generateKeyA);

            expect(dataInRedis).toBeFalsy();
        });

        it('saved data is NOT available for read after delete (data is []), sending full key', async () => {
            const random = [];
            const name = faker.animal.rodent();

            const generateKeyA = RedisService.generateKey({
                name,
                toHash: random
            });

            await RedisService.save(generateKeyA, random);
            await RedisService.delete(generateKeyA);

            const dataInRedis = await RedisService.read(generateKeyA);

            expect(dataInRedis).toBeFalsy();
        });
    });
});
