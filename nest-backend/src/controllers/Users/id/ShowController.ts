import { User } from '@/entities/User';

import { Controller, Get, Param } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Routes } from '@/types/enums/Routes';
import { ShowUsersService } from '@/services/Users/ShowUserService';

@ApiTags(Routes.USERS)
@Controller(`/api/${Routes.USERS}`)
export class ShowController {
    constructor(private usersService: ShowUsersService) {}

    @Get(':id')
    invoke(@Param() params: any): Promise<User> {
        return this.usersService.findOne(params.id);
    }
}
