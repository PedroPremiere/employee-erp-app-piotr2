import { Controller, Post, HttpCode, Body } from '@nestjs/common';

import { RoutesEnum } from '@/types/enums/Routes.enum';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from '@/services/Auth/AuthService';
import { CreateUserDto } from '@/dto/User/CreateUserDto';
import { LoginResponseDto } from '@/dto/Auth/LoginResponseDto';
import { CreateUserService } from '@/services/Users/CreateUserService';

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
