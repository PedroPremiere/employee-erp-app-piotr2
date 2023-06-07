import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesRepository } from '@/repositories/RolesRepository';
import { StoreController } from '@/controllers/Roles/StoreController';
import { CreateRoleService } from '@/services/Roles/CreateRoleService';
import { UsersRepository } from '@/repositories/UsersRepository';

@Module({
    imports: [
        TypeOrmModule.forFeature([RolesRepository]),
        TypeOrmModule.forFeature([UsersRepository])
    ],
    controllers: [StoreController],
    providers: [CreateRoleService, RolesRepository, UsersRepository]
})
export class RolesModule {}
