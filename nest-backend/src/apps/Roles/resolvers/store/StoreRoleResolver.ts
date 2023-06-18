import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable, UseFilters } from '@nestjs/common';

import { Role } from '@/apps/Roles/entities/Role';
import { RoleDto } from '@/apps/Roles/dto/RoleDto';
import { CreateRoleDto } from '@/apps/Roles/dto/CreateRoleDto';
import { CreateRoleService } from '@/apps/Roles/services/CreateRoleService';
import { BadRequestExceptionCustom } from '@/project/exceptions/BadRequest.exception';

@Injectable()
@UseFilters(BadRequestExceptionCustom)
@Resolver(() => RoleDto)
export class StoreRoleResolver {
    constructor(private readonly createRoleService: CreateRoleService) {}

    @Mutation(returns => RoleDto)
    async storeRole(
        @Args()
        newRoleData: CreateRoleDto
    ): Promise<Role> {
        return this.createRoleService.create(newRoleData);
    }
}
