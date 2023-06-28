import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable, UseFilters } from '@nestjs/common';

import { RoleDto } from '@/apps/Roles/dto/RoleDto';
import { MessageDto } from '@/project/dto/Messages/MessageDto';
import { EditUserToRoleDto } from '@/apps/Roles/dto/EditUserToRoleDto';
import { NotFoundExceptionCustom } from '@/project/exceptions/NotFound.exception';
import { BadRequestExceptionCustom } from '@/project/exceptions/BadRequest.exception';
import { AddUserToRoleService } from '@/apps/Roles/services/add-user-to-role.service';

@Injectable()
@UseFilters(BadRequestExceptionCustom)
@UseFilters(NotFoundExceptionCustom)
@Resolver(() => RoleDto)
export class AddUserToRoleResolver {
    constructor(private readonly addUserToRoleService: AddUserToRoleService) {}

    @Mutation(returns => MessageDto)
    async addUserToRole(
        @Args()
        newRoleData: EditUserToRoleDto
    ): Promise<{ message: string }> {
        return this.addUserToRoleService.addUserToRole(newRoleData);
    }
}
