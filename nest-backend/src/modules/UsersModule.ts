import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersRepository } from '@/repositories/UsersRepository';
import { IndexController } from '@/controllers/Users/IndexController';
import { IndexUsersService } from '@/services/Users/IndexUsersService';
import { ShowController } from '@/controllers/Users/id/ShowController';
import { ShowUsersService } from '@/services/Users/ShowUserService';
import { DeleteController } from '@/controllers/Users/id/DestroyController';
import { DeleteUsersService } from '@/services/Users/DeleteUsersService';
import { StoreController } from '@/controllers/Users/StoreController';
import { CreateUserService } from '@/services/Users/CreateUserService';

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
        CreateUserService
    ]
})
export class UsersModule {}
