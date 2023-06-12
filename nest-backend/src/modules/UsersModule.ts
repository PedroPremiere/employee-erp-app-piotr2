import { Module } from '@nestjs/common';
import { ShowUsersService } from '@/services/Users/ShowUserService';
import { StoreController } from '@/controllers/Users/StoreController';
import { IndexUsersController } from '@/controllers/Users/IndexUsersController';
import { CreateUserService } from '@/services/Users/CreateUserService';
import { IndexUsersService } from '@/services/Users/IndexUsersService';
import { ShowController } from '@/controllers/Users/id/ShowController';
import { DeleteUsersService } from '@/services/Users/DeleteUsersService';
import { FindByEmailService } from '@/services/Users/FindByEmailService';
import { DeleteController } from '@/controllers/Users/id/DestroyController';
import { PrismaService } from '@/services/PrismaService.service';
import { PrismaServiceFactory } from '@/services/PrismaServiceFactory.service';

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
        FindByEmailService,
        {
            provide: PrismaService,
            useValue: PrismaServiceFactory.create()
        }
    ],
    exports: [FindByEmailService]
})
export class UsersModule {}
