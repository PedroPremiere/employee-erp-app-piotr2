import { Controller, Request, Post, HttpCode, Body } from '@nestjs/common';

import { Routes } from '@/types/enums/Routes';
import { AuthService } from '@/auth/auth.service';
import { CreateUserDto } from '@/dto/User/CreateUserDto';
import { CreateUserService } from '@/services/Users/CreateUserService';

@Controller('api')
export class RegisterController {
    constructor(
        private authService: AuthService,
        private usersService: CreateUserService
    ) {}

    @Post(Routes.REGISTER)
    @HttpCode(200)
    async invoke(@Body() userData: CreateUserDto) {
        const newUser = await this.usersService.create(userData);

        return this.authService.login({
            email: newUser.email,
            id: newUser.id
        });
    }
}
