import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersRepository } from '@/repositories/UsersRepository';
import { ShowUsersService } from '@/services/Users/ShowUserService';
import { StoreController } from '@/controllers/Users/StoreController';
import { IndexController } from '@/controllers/Users/IndexController';
import { CreateUserService } from '@/services/Users/CreateUserService';
import { IndexUsersService } from '@/services/Users/IndexUsersService';
import { ShowController } from '@/controllers/Users/id/ShowController';
import { DeleteUsersService } from '@/services/Users/DeleteUsersService';
import { FindByEmailService } from '@/services/Users/FindByEmailService';
import { DeleteController } from '@/controllers/Users/id/DestroyController';

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository])],
    controllers: [
        IndexController,
        ShowController,
        DeleteController,
        StoreController
    ],
    providers: [
        IndexUsersService,
        ShowUsersService,
        DeleteUsersService,
        UsersRepository,
        CreateUserService,
        FindByEmailService
    ],
    exports: [FindByEmailService]
})
export class UsersModule {}
