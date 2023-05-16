import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersRepository } from '@/repositories/UsersRepository';
import { IndexController } from '@/controllers/Users/IndexController';
import { IndexUsersService } from '@/services/Users/IndexUsersService';
import { ShowController } from '@/controllers/Users/ShowController';
import { ShowUsersService } from '@/services/Users/ShowUserService';

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository])],
    controllers: [IndexController, ShowController],
    providers: [IndexUsersService, ShowUsersService, UsersRepository]
})
export class UsersModule {}
