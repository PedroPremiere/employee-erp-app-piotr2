import { User } from '@/entities/User';
import { Controller, Get } from '@nestjs/common';

import { IndexUsersService } from '@/services/Users/IndexUsersService';

@Controller('api')
export class IndexController {
    constructor(private usersService: IndexUsersService) {}

    @Get('users')
    invoke(): Promise<User[]> {
        return this.usersService.findAll();
    }
}
