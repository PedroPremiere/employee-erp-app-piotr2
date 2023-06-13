import { Module } from '@nestjs/common';
import { ShowUsersService } from '@/apps/User/services/ShowUserService';
import { StoreController } from '@/apps/User/controllers/StoreController';
import { IndexUsersController } from '@/apps/User/controllers/IndexUsersController';
import { CreateUserService } from '@/apps/User/services/CreateUserService';
import { IndexUsersService } from '@/apps/User/services/IndexUsersService';
import { ShowController } from '@/apps/User/controllers/id/ShowController';
import { DeleteUsersService } from '@/apps/User/services/DeleteUsersService';
import { FindByEmailService } from '@/apps/User/services/FindByEmailService';
import { DeleteController } from '@/apps/User/controllers/id/DestroyController';
import { PrismaService } from '@/apps/PrismaService.service';
import { PrismaServiceFactory } from '@/apps/Auth/PrismaServiceFactory.service';
import { ShowUserResolver } from '@/apps/User/resolvers/ShowUserResolver';

@Module({
    controllers: [
        IndexUsersController,
        ShowController,
        DeleteController,
        StoreController
    ],
    providers: [
        IndexUsersService,
        ShowUsersService,
        DeleteUsersService,
        CreateUserService,
        ShowUserResolver,
        FindByEmailService,
        {
            provide: PrismaService,
            useValue: PrismaServiceFactory.create()
        }
    ],
    exports: [FindByEmailService]
})
export class UsersModule {}
