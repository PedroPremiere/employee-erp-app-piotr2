import { Module } from '@nestjs/common';

import { StoreController } from '@/controllers/Roles/StoreController';
import { CreateRoleService } from '@/services/Roles/CreateRoleService';

import { PrismaService } from '@/services/PrismaService.service';
import { PrismaServiceFactory } from '@/services/PrismaServiceFactory.service';

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
