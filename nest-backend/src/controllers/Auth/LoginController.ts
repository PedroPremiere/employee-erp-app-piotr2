import { Controller, Request, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth/')
export class LoginController {
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return req.user;
    }
}
