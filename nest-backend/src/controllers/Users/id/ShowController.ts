import { User } from '@/entities/User';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { UserDto } from '@/dto/User/UserDto';
import { Routes } from '@/types/enums/Routes';
import { ShowUsersService } from '@/services/Users/ShowUserService';

@ApiTags(Routes.USERS)
@Controller()
export class ShowController {
    constructor(private usersService: ShowUsersService) {}

    @Get(`${Routes.USERS}/:id`)
    @ApiOkResponse({ type: UserDto })
    @ApiParam({ name: 'id', description: 'Id of item' })
    invoke(@Param() params: any): Promise<User> {
        return this.usersService.findOne(params.id);
    }
}
