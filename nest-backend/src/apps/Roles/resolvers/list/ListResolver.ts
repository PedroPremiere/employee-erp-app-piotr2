import { Injectable, UseFilters } from '@nestjs/common';
import { Args, Query, Resolver, ResolveReference, Root } from '@nestjs/graphql';

import { UserDto } from '@/apps/User/dto/UserDto';
import { RoleDto } from '@/apps/Roles/dto/RoleDto';
import { ContractDto } from '@/apps/Contracts/dto/ContractDto';
import { ShowRoleService } from '@/apps/Roles/services/ShowRoleService';
import { IndexRoleService } from '@/apps/Roles/services/IndexRoleService';
import { PaginationQueryDto } from '@/project/dto/Page/PaginationQueryDto';
import { PaginationFieldsPipe } from '@/project/interceptors/AddSpecialFields';
import { BadRequestExceptionCustom } from '@/project/exceptions/BadRequest.exception';

@Injectable()
@UseFilters(BadRequestExceptionCustom)
@Resolver(() => [ContractDto])
export class ListRoleResolver {
    constructor(
        private readonly showRoleService: ShowRoleService,
        private readonly indexRoleService: IndexRoleService
    ) {}

    @ResolveReference()
    async users(@Root() role: RoleDto): Promise<UserDto[]> {
        return this.showRoleService.findUsers(role.id);
    }

    @Query(returns => [RoleDto])
    async listRoles(
        @Args('', new PaginationFieldsPipe(RoleDto))
        paginationQuery: PaginationQueryDto
    ): Promise<RoleDto[]> {
        return this.indexRoleService.findMany(paginationQuery);
    }
}
