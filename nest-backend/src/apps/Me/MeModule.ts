import { Module } from '@nestjs/common';

import { ProfileController } from '@/apps/Me/controllers/ProfileController';
import { IndexUsersService } from '@/apps/User/services/IndexUsersService';
import { PrismaService } from '@/apps/PrismaService.service';
import { PrismaServiceFactory } from '@/apps/Auth/PrismaServiceFactory.service';

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
