import { Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Injectable, UseFilters, UseGuards } from '@nestjs/common';

import { UserDto } from '@/apps/User/dto/UserDto';
import { ShowUsersService } from '@/apps/User/services/ShowUserService';
import { NotFoundExceptionCustom } from '@/project/exceptions/NotFound.exception';

import { CurrentUser } from '@/apps/Auth/decorators/CurrentUser';

import { ContractDto } from '@/apps/Contracts/dto/ContractDto';
import { GqlAuthGuard } from '@/apps/Auth/jwt/GqlAuthGuard.guard';
import { UnauthorizedCustom } from '@/project/exceptions/Unauthorized.exception';

@Injectable()
@Resolver(() => UserDto)
@UseFilters(NotFoundExceptionCustom)
@UseFilters(UnauthorizedCustom)
export class ShowMeResolver {
    constructor(private readonly showUsersService: ShowUsersService) {}

    @ResolveField()
    contracts(@Root() user: UserDto): Promise<ContractDto[] | null> {
        return this.showUsersService.findContracts(user.id);
    }

    @Query(returns => UserDto)
    @UseFilters(UnauthorizedCustom)
    @UseGuards(GqlAuthGuard)
    me(@CurrentUser() user): Promise<UserDto | null> {
        return this.showUsersService.findOne(user?.id);
    }
}
