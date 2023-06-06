import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

import { User } from '@/entities/User';
import { RoutesEnum } from '@/types/enums/Routes.enum';
import { CreateUserDto } from '@/dto/User/CreateUserDto';
import { CreateUserService } from '@/services/Users/CreateUserService';

@ApiTags(RoutesEnum.USERS)
@Controller()
export class StoreController {
    constructor(private usersService: CreateUserService) {}

    @Post(RoutesEnum.USERS)
    invoke(@Body() userData: CreateUserDto): Promise<User> {
        return this.usersService.create(userData);
    }
}
