import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

import { User } from '@/entities/User';
import { Routes } from '@/types/enums/Routes';
import { CreateUserDto } from '@/dto/User/CreateUserDto';
import { CreateUserService } from '@/services/Users/CreateUserService';

@ApiTags(Routes.USERS)
@Controller()
export class StoreController {
    constructor(private usersService: CreateUserService) {}

    @Post(Routes.USERS)
    invoke(@Body() userData: CreateUserDto): Promise<User> {
        return this.usersService.create(userData);
    }
}
