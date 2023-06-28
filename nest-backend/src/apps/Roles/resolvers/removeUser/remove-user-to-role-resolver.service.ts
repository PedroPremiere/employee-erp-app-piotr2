import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable, UseFilters } from '@nestjs/common';

import { RoleDto } from '@/apps/Roles/dto/RoleDto';
import { MessageDto } from '@/project/dto/Messages/MessageDto';
import { EditUserToRoleDto } from '@/apps/Roles/dto/EditUserToRoleDto';
import { NotFoundExceptionCustom } from '@/project/exceptions/NotFound.exception';
import { BadRequestExceptionCustom } from '@/project/exceptions/BadRequest.exception';
import { RemoveUserFromRoleService } from '@/apps/Roles/services/remove-user-to-role.service';

@Injectable()
@UseFilters(BadRequestExceptionCustom)
@UseFilters(NotFoundExceptionCustom)
@Resolver(() => RoleDto)
export class RemoveUserFromRoleResolver {
    constructor(
        private readonly removeUserFromRoleService: RemoveUserFromRoleService
    ) {}

    @Mutation(returns => MessageDto)
    async removeUserFromRole(
        @Args()
        newRoleData: EditUserToRoleDto
    ): Promise<{ message: string }> {
        return this.removeUserFromRoleService.removeUserFromRole(newRoleData);
    }
}
