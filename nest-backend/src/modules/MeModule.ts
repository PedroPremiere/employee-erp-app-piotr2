import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersRepository } from '@/repositories/UsersRepository';

import { ProfileController } from '@/controllers/Me/ProfileController';
import { IndexUsersService } from '@/services/Users/IndexUsersService';

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository])],
    controllers: [ProfileController],
    providers: [IndexUsersService, UsersRepository]
})
export class MeModule {}
