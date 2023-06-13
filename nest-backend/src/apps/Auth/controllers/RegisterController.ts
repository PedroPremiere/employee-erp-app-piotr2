import { Controller, Post, HttpCode, Body } from '@nestjs/common';

import { RoutesEnum } from '@/project/types/enums/Routes.enum';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from '@/apps/Auth/services/AuthService';
import { CreateUserDto } from '@/apps/User/dto/CreateUserDto';
import { LoginResponseDto } from '@/apps/Auth/dto/LoginResponseDto';
import { CreateUserService } from '@/apps/User/services/CreateUserService';

@Controller()
export class RegisterController {
    constructor(
        private authService: AuthService,
        private usersService: CreateUserService
    ) {}

    @Post(RoutesEnum.REGISTER)
    @HttpCode(200)
    @ApiOkResponse({
        status: 200,
        description: 'Login success',
        type: LoginResponseDto
    })
    async invoke(@Body() userData: CreateUserDto) {
        const newUser = await this.usersService.create(userData);

        return this.authService.login({
            email: newUser.email,
            id: newUser.id
        });
    }
}
