import { User } from '@/entities/User';

import { Controller, Get, Param } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Routes } from '@/types/enums/Routes';
import { ShowUsersService } from '@/services/Users/ShowUserService';

@ApiTags(Routes.USERS)
@Controller()
export class ShowController {
    constructor(private usersService: ShowUsersService) {}

    @Get(`${Routes.USERS}/:id`)
    invoke(@Param() params: any): Promise<User> {
        return this.usersService.findOne(params.id);
    }
}
