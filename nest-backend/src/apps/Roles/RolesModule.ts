import { Module } from '@nestjs/common';

import { CreateRoleService } from '@/apps/Roles/services/CreateRoleService';

import { ShowRoleService } from '@/apps/Roles/services/ShowRoleService';
import { IndexRoleService } from '@/apps/Roles/services/IndexRoleService';
import { DeleteRoleService } from '@/apps/Roles/services/DeleteRoleService';
import { ListRoleResolver } from '@/apps/Roles/resolvers/list/ListResolver';
import { ShowRoleResolver } from '@/apps/Roles/resolvers/show/ShowRoleResolver';
import { StoreRoleResolver } from '@/apps/Roles/resolvers/store/StoreRoleResolver';
import { DeleteRoleResolver } from '@/apps/Roles/resolvers/delete/DeleteRoleResolver';
import { UpdateRoleService } from '@/apps/Roles/services/UpdateRoleService';
import { UpdateRoleResolver } from '@/apps/Roles/resolvers/update/UpdateRoleResolver';
import { AddUserToRoleService } from '@/apps/Roles/services/add-user-to-role.service';
import { AddUserToRoleResolver } from '@/apps/Roles/resolvers/addUser/edit-user-to-role-resolver.service';
import { ExistingRolesArrayDecorator } from '@/apps/Roles/validators/existing-roles-array-decorator.service';

@Module({
    providers: [
        CreateRoleService,
        DeleteRoleResolver,
        DeleteRoleService,
        ShowRoleResolver,
        ShowRoleService,
        StoreRoleResolver,
        IndexRoleService,
        ListRoleResolver,
        UpdateRoleService,
        UpdateRoleResolver,
        AddUserToRoleService,
        AddUserToRoleResolver,
        ExistingRolesArrayDecorator
    ]
})
export class RolesModule {}
