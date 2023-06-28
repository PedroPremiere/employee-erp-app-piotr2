import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { UserDto } from '@/apps/User/dto/UserDto';
import { Injectable, UseFilters } from '@nestjs/common';
import { MessageDto } from '@/project/dto/Messages/MessageDto';
import { DeleteUsersService } from '@/apps/User/services/DeleteUsersService';
import { NotFoundExceptionCustom } from '@/project/exceptions/NotFound.exception';

@Injectable()
@UseFilters(NotFoundExceptionCustom)
@Resolver(() => UserDto)
export class DeleteUserResolver {
    constructor(private readonly deleteUsersService: DeleteUsersService) {}

    @Mutation(returns => MessageDto)
    async deleteUser(
        @Args('id') id: string,
        @Context('req') req
    ): Promise<MessageDto> {
        await this.deleteUsersService.delete(id);

        const message = req.__('DELETED');

        return { message };
    }
}
