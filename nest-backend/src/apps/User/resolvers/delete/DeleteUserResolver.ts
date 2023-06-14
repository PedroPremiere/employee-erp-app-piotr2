import { I18n, I18nContext } from 'nestjs-i18n';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UserDto } from '@/apps/User/dto/UserDto';
import { Injectable, UseFilters } from '@nestjs/common';
import { DeleteMessage } from '@/project/dto/Messages/DeleteMessage';
import { DeleteUsersService } from '@/apps/User/services/DeleteUsersService';
import { NotFoundExceptionCustom } from '@/project/exceptions/NotFound.exception';

@Injectable()
@UseFilters(NotFoundExceptionCustom)
@Resolver(() => UserDto)
export class DeleteUserResolver {
    constructor(private readonly deleteUsersService: DeleteUsersService) {}

    @Mutation(returns => DeleteMessage)
    async deleteUser(
        @Args('id') id: string,
        @I18n() i18n: I18nContext
    ): Promise<DeleteMessage> {
        await this.deleteUsersService.delete(id);

        const message = i18n.t('messages.DELETED');
        return { message };
    }
}
