import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

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
        @Context('req') req
    ): Promise<DeleteMessage> {
        await this.deleteUsersService.delete(id);

        const message = req.__('DELETED');

        return { message };
    }
}
