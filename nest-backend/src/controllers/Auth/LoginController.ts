import { Controller, Request, Post, UseGuards, HttpCode } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { Routes } from '@/types/enums/Routes';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from '@/auth/auth.service';
import { LoginResponseDto } from '@/dto/Auth/LoginResponseDto';
import { CreateUserDto } from '@/dto/User/CreateUserDto';

@Controller()
export class LoginController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post(Routes.LOGIN)
    @HttpCode(200)
    @ApiOkResponse({
        status: 200,
        description: 'Login success',
        type: LoginResponseDto
    })
    @ApiBody({ type: CreateUserDto })
    async invoke(@Request() req) {
        return this.authService.login(req.user);
    }
}
