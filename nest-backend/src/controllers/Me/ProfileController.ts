import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Request } from '@nestjs/common';

import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@ApiTags('me')
@Controller('api')
export class ProfileController {
    @Get('me')
    @UseGuards(JwtAuthGuard)
    invoke(@Request() req) {
        //todo add user data
        return req.user;
    }
}
