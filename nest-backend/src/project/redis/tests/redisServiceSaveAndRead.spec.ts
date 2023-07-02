/*
 * @group redis
 * @group RedisService
 */

import { faker } from '@faker-js/faker';

import { RedisService } from '@/project/redis/RedisService';

describe('Redis Service', () => {
    describe('save', () => {
        it('saved data is available for read (data is json)', async () => {
            const random = faker.datatype.json();
            const name = faker.animal.rodent();

            RedisService.save(name, random);

            const dataInRedis = await RedisService.read(name);

            expect(dataInRedis).toStrictEqual(random);
        });

        it('saved data is available for read (data is array of json)', async () => {
            const random = [
                faker.datatype.json(),
                faker.datatype.json(),
                faker.datatype.json()
            ];
            const name = faker.animal.rodent();

            RedisService.save(name, random);

            const dataInRedis = await RedisService.read(name);

            expect(dataInRedis).toStrictEqual(random);
        });

        it('saved data is available for read (data is empty array)', async () => {
            const random = [];
            const name = faker.animal.rodent();

            RedisService.save(name, random);

            const dataInRedis = await RedisService.read(name);

            expect(dataInRedis).toStrictEqual(random);
        });

        it('saved data is available for read (data is string array)', async () => {
            const random = [
                faker.animal.rodent(),
                faker.animal.rodent(),
                faker.animal.rodent()
            ];
            const name = faker.animal.rodent();

            RedisService.save(name, random);

            const dataInRedis = await RedisService.read(name);

            expect(dataInRedis).toStrictEqual(random);
        });

        it('saved data is available for read (data is number array)', async () => {
            const random = [
                faker.datatype.number(),
                faker.datatype.number(),
                faker.datatype.number()
            ];
            const name = faker.animal.rodent();

            RedisService.save(name, random);

            const dataInRedis = await RedisService.read(name);

            expect(dataInRedis).toStrictEqual(random);
        });
    });
});
