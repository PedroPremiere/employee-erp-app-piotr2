import { Module } from '@nestjs/common';

import { StoreController } from '@/apps/Roles/controllers/StoreController';
import { CreateRoleService } from '@/apps/Roles/services/CreateRoleService';

import { PrismaService } from '@/apps/PrismaService.service';
import { PrismaServiceFactory } from '@/apps/Auth/PrismaServiceFactory.service';

@Module({
    controllers: [StoreController],
    providers: [
        CreateRoleService,
        {
            provide: PrismaService,
            useValue: PrismaServiceFactory.create()
        }
    ]
})
export class RolesModule {}
