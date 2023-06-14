import { Args, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Injectable, UseFilters } from '@nestjs/common';

import { UserDto } from '@/apps/User/dto/UserDto';
import { ContractDto } from '@/apps/Contracts/dto/ContractDto';
import { ShowUsersService } from '@/apps/User/services/ShowUserService';
import { NotFoundExceptionCustom } from '@/project/exceptions/NotFound.exception';

@Injectable()
@UseFilters(NotFoundExceptionCustom)
@Resolver(() => UserDto)
export class ShowUserResolver {
    constructor(private readonly showUsersService: ShowUsersService) {}

    @ResolveField()
    contracts(@Root() user: UserDto): Promise<ContractDto[] | null> {
        return this.showUsersService.findContracts(user.id);
    }

    @Query(returns => UserDto)
    async user(@Args('id') id: string): Promise<UserDto> {
        const user = await this.showUsersService.findOne(id);

        return user;
    }
}
