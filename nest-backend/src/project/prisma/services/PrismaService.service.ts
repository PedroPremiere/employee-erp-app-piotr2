import { PrismaClient } from '@prisma/client';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';

import { softDelete } from '@/db/middlewares/SoftDelete';
import { redisMiddleware } from '@/project/redis/redisMiddleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        this.$use(softDelete());
        this.$use(redisMiddleware());
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }

    onModuleDestroy() {
        return this.$disconnect();
    }
}
