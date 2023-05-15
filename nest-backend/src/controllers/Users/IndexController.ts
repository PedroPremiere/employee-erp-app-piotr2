import { User } from '@/entities/User';
import { Controller, Get } from '@nestjs/common';

import { IndexUsersService } from '@/services/Users/IndexUsersService';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api')
export class IndexController {
    constructor(private usersService: IndexUsersService) {}

    @Get('users')
    invoke(): Promise<User[]> {
        return this.usersService.findAll();
    }
}
