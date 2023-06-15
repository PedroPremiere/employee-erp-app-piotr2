import { Args, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Injectable, UseFilters } from '@nestjs/common';

import { UserDto } from '@/apps/User/dto/UserDto';
import { RoleDto } from '@/apps/Roles/dto/RoleDto';
import { ShowRoleService } from '@/apps/Roles/services/ShowRoleService';
import { NotFoundExceptionCustom } from '@/project/exceptions/NotFound.exception';

@Injectable()
@UseFilters(NotFoundExceptionCustom)
@Resolver(() => RoleDto)
export class ShowRoleResolver {
    constructor(private readonly showRoleService: ShowRoleService) {}

    @ResolveField()
    users(@Root() role: RoleDto): Promise<UserDto[] | null> {
        return this.showRoleService.findUsers(role.id);
    }

    @Query(returns => RoleDto)
    async role(@Args('id') id: string): Promise<RoleDto> {
        const user = await this.showRoleService.findOne(id);

        return user;
    }
}
