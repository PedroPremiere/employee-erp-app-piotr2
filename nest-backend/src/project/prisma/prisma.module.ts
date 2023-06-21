import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';
import { PrismaServiceFactory } from '@/project/prisma/factories/PrismaServiceFactory.service';

@Global()
@Module({
    providers: [
        {
            provide: PrismaService,
            useValue: PrismaServiceFactory.create()
        }
    ],
    exports: [PrismaService]
})
export class PrismaModule {}
