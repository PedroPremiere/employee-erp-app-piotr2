import { Controller, Request, Post, UseGuards, HttpCode } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@/auth/auth.service';

@Controller('api/auth/')
export class LoginController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @HttpCode(200)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
