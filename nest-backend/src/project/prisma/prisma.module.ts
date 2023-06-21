import { Global, Module } from '@nestjs/common';

import { PrismaService } from '@/project/prisma/services/PrismaService.service';
import { PrismaIndicator } from '@/project/prisma/indicators/prisma-indicator.service';
import { PrismaServiceFactory } from '@/project/prisma/factories/PrismaServiceFactory.service';

@Global()
@Module({
    providers: [
        {
            provide: PrismaService,
            useValue: PrismaServiceFactory.create()
        },
        PrismaIndicator
    ],
    exports: [PrismaService, PrismaIndicator]
})
export class PrismaModule {}
