import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

//import { User } from '@/entities/User';

import { RoutesEnum } from '@/project/types/enums/Routes.enum';
import { CreateUserDto } from '@/apps/User/dto/CreateUserDto';
import { CreateUserService } from '@/apps/User/services/CreateUserService';

import type { User } from '@prisma/client';

@ApiTags(RoutesEnum.USERS)
@Controller()
export class StoreController {
    constructor(private usersService: CreateUserService) {}

    @Post(RoutesEnum.USERS)
    invoke(@Body() userData: CreateUserDto): Promise<User> {
        return this.usersService.create(userData);
    }
}
