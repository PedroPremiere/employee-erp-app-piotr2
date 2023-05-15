import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersRepository } from '@/repositories/UsersRepository';
import { IndexController } from '@/controllers/Users/IndexController';
import { IndexUsersService } from '@/services/Users/IndexUsersService';

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository])],
    controllers: [IndexController],
    providers: [IndexUsersService, UsersRepository]
})
export class UsersModule {}
