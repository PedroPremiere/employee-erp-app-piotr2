import { Module } from '@nestjs/common';

import { ProfileController } from '@/controllers/Me/ProfileController';
import { IndexUsersService } from '@/services/Users/IndexUsersService';
import { PrismaService } from '@/services/PrismaService.service';
import { PrismaServiceFactory } from '@/services/PrismaServiceFactory.service';

@Module({
    controllers: [ProfileController],
    providers: [
        IndexUsersService,
        {
            provide: PrismaService,
            useValue: PrismaServiceFactory.create()
        }
    ]
})
export class MeModule {}
