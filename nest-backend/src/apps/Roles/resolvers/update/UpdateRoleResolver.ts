import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable, UseFilters } from '@nestjs/common';

import { Role } from '@/apps/Roles/entities/Role';
import { RoleDto } from '@/apps/Roles/dto/RoleDto';
import { UpdateRoleDto } from '@/apps/Roles/dto/UpdateRoleDto';
import { UpdateRoleService } from '@/apps/Roles/services/UpdateRoleService';
import { BadRequestExceptionCustom } from '@/project/exceptions/BadRequest.exception';
import { NotFoundExceptionCustom } from '@/project/exceptions/NotFound.exception';

@Injectable()
@UseFilters(BadRequestExceptionCustom)
@UseFilters(NotFoundExceptionCustom)
@Resolver(() => RoleDto)
export class UpdateRoleResolver {
    constructor(private readonly updateRoleService: UpdateRoleService) {}

    @Mutation(returns => RoleDto)
    async updateRole(
        @Args()
        newRoleData: UpdateRoleDto
    ): Promise<Role> {
        return this.updateRoleService.update(newRoleData);
    }
}
