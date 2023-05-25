import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { User } from '@/entities/User';
import { ApiTags } from '@nestjs/swagger';
import { Routes } from '@/types/enums/Routes';
import { IndexUsersService } from '@/services/Users/IndexUsersService';
import { IndexInterceptor } from '@/interceptors/IndexInterceptor';

@ApiTags(Routes.USERS)
@Controller()
export class IndexUsersController {
    constructor(private usersService: IndexUsersService) {}

    @Get(Routes.USERS)
    @UseInterceptors(IndexInterceptor)
    invoke(): Promise<[User[], number]> {
        return this.usersService.findAll();
    }
}
