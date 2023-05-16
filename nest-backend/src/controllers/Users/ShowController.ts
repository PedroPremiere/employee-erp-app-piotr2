import { User } from '@/entities/User';
import { Controller, Get } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ShowUsersService } from '@/services/Users/ShowUserService';

@ApiTags('users')
@Controller('api')
export class IndexController {
    constructor(private usersService: ShowUsersService) {}

    @Get('users/:id')
    invoke(id): Promise<User> {
        return this.usersService.findOne(id);
    }
}
