import { Controller, Request, Post, UseGuards, HttpCode } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { Routes } from '@/types/enums/Routes';
import { AuthService } from '@/auth/auth.service';

@Controller()
export class LoginController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post(Routes.LOGIN)
    @HttpCode(200)
    async invoke(@Request() req) {
        return this.authService.login(req.user);
    }
}
