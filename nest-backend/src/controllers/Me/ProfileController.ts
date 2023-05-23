import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Request } from '@nestjs/common';

import { Routes } from '@/types/enums/Routes';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@ApiTags(Routes.ME)
@Controller()
export class ProfileController {
    @Get(Routes.ME)
    @UseGuards(JwtAuthGuard)
    invoke(@Request() req) {
        return req.user;
    }
}
