import { Controller, Get } from '@nestjs/common';

import { User } from '@/entities/User';
import { ApiTags } from '@nestjs/swagger';
import { Routes } from '@/types/enums/Routes';
import { IndexUsersService } from '@/services/Users/IndexUsersService';

@ApiTags(Routes.USERS)
@Controller('api')
export class IndexController {
    constructor(private usersService: IndexUsersService) {}

    @Get(Routes.USERS)
    invoke(): Promise<User[]> {
        return this.usersService.findAll();
    }
}
