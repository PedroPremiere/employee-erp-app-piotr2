import { User } from '@/entities/User';
import { Body, Controller, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@/dto/User/CreateUserDto';
import { CreateUserService } from '@/services/Users/CreateUserService';

@ApiTags('users')
@Controller('api')
export class StoreController {
    constructor(private usersService: CreateUserService) {}

    @Post('users')
    invoke(@Body() userData: CreateUserDto): Promise<User> {
        return this.usersService.create(userData);
    }
}
