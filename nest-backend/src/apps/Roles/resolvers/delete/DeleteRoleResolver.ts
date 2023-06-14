import { I18n, I18nContext } from 'nestjs-i18n';
import { Injectable, UseFilters } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
        @Args('id') id: string,
        @I18n() i18n: I18nContext
    ): Promise<DeleteMessage> {
        await this.deleteRoleService.delete(id);

        const message = i18n.t('messages.DELETED');
        return { message };
    }
}
