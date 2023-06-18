import { Injectable, UseFilters } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { RoleDto } from '@/apps/Roles/dto/RoleDto';
import { DeleteMessage } from '@/project/dto/Messages/DeleteMessage';
import { DeleteRoleService } from '@/apps/Roles/services/DeleteRoleService';
import { NotFoundExceptionCustom } from '@/project/exceptions/NotFound.exception';

@Injectable()
@UseFilters(NotFoundExceptionCustom)
@Resolver(() => RoleDto)
export class DeleteRoleResolver {
    constructor(private readonly deleteRoleService: DeleteRoleService) {}

    @Mutation(returns => DeleteMessage)
    async deleteRole(
        @Context('req') req,
        @Args('id') id: string
    ): Promise<DeleteMessage> {
        await this.deleteRoleService.delete(id);

        const message = req.__('DELETED');
        return { message };
    }
}
