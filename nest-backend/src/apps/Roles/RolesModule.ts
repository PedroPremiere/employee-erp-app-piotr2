import { Module } from '@nestjs/common';

import { CreateRoleService } from '@/apps/Roles/services/CreateRoleService';

import { DeleteRoleResolver } from '@/apps/Roles/resolvers/delete/DeleteRoleResolver';
import { DeleteRoleService } from '@/apps/Roles/services/DeleteRoleService';
import { ShowRoleResolver } from '@/apps/Roles/resolvers/show/ShowRoleResolver';
import { ShowRoleService } from '@/apps/Roles/services/ShowRoleService';
import { StoreRoleResolver } from '@/apps/Roles/resolvers/store/StoreRoleResolver';

@Module({
    providers: [
        CreateRoleService,
        DeleteRoleResolver,
        DeleteRoleService,
        ShowRoleResolver,
        ShowRoleService,
        StoreRoleResolver
    ]
})
export class RolesModule {}
