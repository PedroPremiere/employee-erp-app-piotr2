import { Prisma } from '@prisma/client';
import { RedisService } from '@/project/redis/RedisService';

const cleanRedisWhen = [
    'update',
    'delete',
    'deleteMany',
    'updateMany',
    'create',
    'createMany'
];

//todo add , 'findMany'
const tryToReadFromRedisWhen = ['findFirst', 'findUnique'];

export function redisMiddleware<
    T extends Prisma.BatchPayload = Prisma.BatchPayload
>(): Prisma.Middleware {
    return async (
        params: Prisma.MiddlewareParams,
        next: (params: Prisma.MiddlewareParams) => Promise<T>
    ): Promise<T> => {
        const { args, model, action } = params;
        if (tryToReadFromRedisWhen.includes(action)) {
            const key = RedisService.generateKey({
                name: model,
                toHash: args
            });

            return (
                (await RedisService.returnDataFromRedis(key)) ||
                (await RedisService.saveToRedisAndReturn(key, next, params))
            );
        }

        if (cleanRedisWhen.includes(action)) {
            await RedisService.delete(model);
            return next(params);
        }

        return next(params);
    };
}
