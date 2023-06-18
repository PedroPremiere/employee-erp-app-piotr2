import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UserDto } from '@/apps/User/dto/UserDto';
import { Injectable, UseFilters } from '@nestjs/common';
import { CreateUserDto } from '@/apps/User/dto/CreateUserDto';
import { CreateUserService } from '@/apps/User/services/CreateUserService';
import { BadRequestExceptionCustom } from '@/project/exceptions/BadRequest.exception';

@Injectable()
@UseFilters(BadRequestExceptionCustom)
@Resolver(() => UserDto)
export class StoreUserResolver {
    constructor(private readonly createUserService: CreateUserService) {}

    @Mutation(returns => UserDto)
    async storeUser(
        @Args()
        newUserData: CreateUserDto
    ): Promise<UserDto> {
        return this.createUserService.create(newUserData);
    }
}
