import { Injectable, UseFilters } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { RoleDto } from '@/apps/Roles/dto/RoleDto';
import { MessageDto } from '@/project/dto/Messages/MessageDto';
import { DeleteRoleService } from '@/apps/Roles/services/DeleteRoleService';
import { NotFoundExceptionCustom } from '@/project/exceptions/NotFound.exception';

@Injectable()
@UseFilters(NotFoundExceptionCustom)
@Resolver(() => RoleDto)
export class DeleteRoleResolver {
    constructor(private readonly deleteRoleService: DeleteRoleService) {}

    @Mutation(returns => MessageDto)
    async deleteRole(
        @Context('req') req,
        @Args('id') id: string
    ): Promise<MessageDto> {
        await this.deleteRoleService.delete(id);

        const message = req.__('DELETED');
        return { message };
    }
}
