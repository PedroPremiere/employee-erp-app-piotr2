import { Module } from '@nestjs/common';

import { CreateRoleService } from '@/apps/Roles/services/CreateRoleService';

import { ShowRoleService } from '@/apps/Roles/services/ShowRoleService';
import { IndexRoleService } from '@/apps/Roles/services/IndexRoleService';
import { DeleteRoleService } from '@/apps/Roles/services/DeleteRoleService';
import { ListRoleResolver } from '@/apps/Roles/resolvers/list/ListResolver';
import { ShowRoleResolver } from '@/apps/Roles/resolvers/show/ShowRoleResolver';
import { StoreRoleResolver } from '@/apps/Roles/resolvers/store/StoreRoleResolver';
import { DeleteRoleResolver } from '@/apps/Roles/resolvers/delete/DeleteRoleResolver';

@Module({
    providers: [
        CreateRoleService,
        DeleteRoleResolver,
        DeleteRoleService,
        ShowRoleResolver,
        ShowRoleService,
        StoreRoleResolver,
        IndexRoleService,
        ListRoleResolver
    ]
})
export class RolesModule {}
