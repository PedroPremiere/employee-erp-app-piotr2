import { Md5 } from 'ts-md5';

import { redis } from '@/project/redis/connect';

export class RedisService {
    static generateKey(data: { name: string; toHash?: unknown }) {
        const { name, toHash } = data;

        const hashed = RedisService.hash(toHash);

        return `${name}.${hashed}`;
    }

    static hash(toHash?: unknown) {
        if (toHash) {
            return Md5.hashStr(JSON.stringify(toHash));
        } else {
            return '';
        }
    }

    static save(key: string, data: unknown) {
        redis.set(key, JSON.stringify(data));
    }

    static async read(key: string) {
        const dataInRedis = await redis.get(key);

        if (!dataInRedis) {
            return false;
        }

        return JSON.parse(dataInRedis);
    }

    static async delete(mainKey: string) {
        const keys = [
            ...(await redis.keys(`${mainKey}.*`)),
            ...(await redis.keys(`${mainKey}`))
        ];

        for (const key of keys) {
            await redis.del(key);
        }
    }

    //todo split to new class
    static async saveToRedisAndReturn(key, next, params) {
        const result = await next(params);

        RedisService.save(key, result);

        return result;
    }

    //todo split to new class
    static async returnDataFromRedis(key) {
        const dataInRedis = await RedisService.read(key);

        if (dataInRedis) {
            return dataInRedis;
        }

        return false;
    }
}
