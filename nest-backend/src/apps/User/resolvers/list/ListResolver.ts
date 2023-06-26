import { Injectable, UseFilters } from '@nestjs/common';
import { Args, Query, Resolver, ResolveReference, Root } from '@nestjs/graphql';

import { UserDto } from '@/apps/User/dto/UserDto';
import { ContractDto } from '@/apps/Contracts/dto/ContractDto';
import { ShowUsersService } from '@/apps/User/services/ShowUserService';
import { IndexUsersService } from '@/apps/User/services/IndexUsersService';
import { PaginationQueryDto } from '@/project/dto/Page/PaginationQueryDto';
import { PaginationFieldsPipe } from '@/project/interceptors/AddSpecialFields';
import { BadRequestExceptionCustom } from '@/project/exceptions/BadRequest.exception';

@Injectable()
@UseFilters(BadRequestExceptionCustom)
@Resolver(() => [UserDto])
export class ListUsersResolver {
    constructor(
        private readonly showUsersService: ShowUsersService,
        private readonly indexUsersService: IndexUsersService
    ) {}

    @ResolveReference()
    async contracts(@Root() user: UserDto): Promise<ContractDto[] | null> {
        return this.showUsersService.findContracts(user.id);
    }

    @Query(returns => [UserDto])
    async listUsers(
        @Args('', new PaginationFieldsPipe(UserDto))
        paginationQuery: PaginationQueryDto
    ): Promise<UserDto[]> {
        return this.indexUsersService.findMany(paginationQuery);
    }
}
