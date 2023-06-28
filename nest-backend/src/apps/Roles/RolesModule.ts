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
import { RemoveUserFromRoleResolver } from '@/apps/Roles/resolvers/removeUser/remove-user-to-role-resolver.service';
import { ExistingRolesArrayDecorator } from '@/apps/Roles/validators/existing-roles-array-decorator.service';
import { RemoveUserFromRoleService } from '@/apps/Roles/services/remove-user-to-role.service';
import { AddUserToRoleResolver } from '@/apps/Roles/resolvers/addUser/add-user-to-role-resolver.service';

@Module({
    providers: [
        ShowRoleService,
        ShowRoleResolver,
        IndexRoleService,
        ListRoleResolver,
        CreateRoleService,
        DeleteRoleService,
        UpdateRoleService,
        StoreRoleResolver,
        DeleteRoleResolver,
        UpdateRoleResolver,
        AddUserToRoleService,
        AddUserToRoleResolver,
        RemoveUserFromRoleService,
        RemoveUserFromRoleResolver,
        ExistingRolesArrayDecorator
    ]
})
export class RolesModule {}
