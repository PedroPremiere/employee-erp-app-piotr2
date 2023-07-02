import { Prisma } from '@prisma/client';
import { redis } from '@/project/redis/connect';

export async function truncate() {
    const tables = Prisma.ModelName;
    const keys = await redis.keys('*');

    for (const key of keys) {
        await redis.del(key);
    }

    await prismaService.$queryRawUnsafe('SET FOREIGN_KEY_CHECKS = 0');

    for (const table in tables) {
        await prismaService[table].deleteMany({});
    }

    await prismaService.$queryRawUnsafe('SET FOREIGN_KEY_CHECKS = 1');
}
