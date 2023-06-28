import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable, UseFilters } from '@nestjs/common';

import { UserDto } from '@/apps/User/dto/UserDto';
import { RoleDto } from '@/apps/Roles/dto/RoleDto';
import { UpdateUserDto } from '@/apps/User/dto/UpdateUserDto';
import { UpdateUserService } from '@/apps/User/services/UpdateUserService';
import { NotFoundExceptionCustom } from '@/project/exceptions/NotFound.exception';
import { BadRequestExceptionCustom } from '@/project/exceptions/BadRequest.exception';

@Injectable()
@UseFilters(BadRequestExceptionCustom)
@UseFilters(NotFoundExceptionCustom)
@Resolver(() => RoleDto)
export class UpdateUserResolver {
    constructor(private readonly updateUserService: UpdateUserService) {}

    @Mutation(returns => UserDto)
    async updateUser(
        @Args()
        newUserData: UpdateUserDto
    ): Promise<UserDto> {
        return this.updateUserService.update(newUserData);
    }
}
