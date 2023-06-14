import { Module } from '@nestjs/common';

import { StoreController } from '@/apps/Roles/controllers/StoreController';
import { CreateRoleService } from '@/apps/Roles/services/CreateRoleService';

import { PrismaService } from '@/apps/PrismaService.service';
import { PrismaServiceFactory } from '@/apps/Auth/PrismaServiceFactory.service';
import { DeleteRoleResolver } from '@/apps/Roles/resolvers/delete/DeleteRoleResolver';
import { DeleteRoleService } from '@/apps/Roles/services/DeleteRoleService';

@Module({
    controllers: [StoreController],
    providers: [
        CreateRoleService,
        DeleteRoleResolver,
        DeleteRoleService,
        {
            provide: PrismaService,
            useValue: PrismaServiceFactory.create()
        }
    ]
})
export class RolesModule {}
