import { Module } from '@nestjs/common';

import { PrismaService } from '@/apps/PrismaService.service';
import { ShowMeResolver } from '@/apps/Me/resolvers/ShowMeResolver';
import { ShowUsersService } from '@/apps/User/services/ShowUserService';
import { IndexUsersService } from '@/apps/User/services/IndexUsersService';
import { PrismaServiceFactory } from '@/apps/Auth/PrismaServiceFactory.service';

@Module({
    providers: [
        IndexUsersService,
        ShowMeResolver,
        ShowUsersService,
        {
            provide: PrismaService,
            useValue: PrismaServiceFactory.create()
        }
    ]
})
export class MeModule {}
