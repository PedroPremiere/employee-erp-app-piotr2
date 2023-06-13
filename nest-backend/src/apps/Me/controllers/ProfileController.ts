import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Request } from '@nestjs/common';

import { RoutesEnum } from '@/project/types/enums/Routes.enum';
import { JwtAuthGuard } from '@/apps/Auth/jwt/jwt-auth.guard';

@ApiTags(RoutesEnum.ME)
@Controller()
export class ProfileController {
    @Get(RoutesEnum.ME)
    @UseGuards(JwtAuthGuard)
    invoke(@Request() req) {
        return req.user;
    }
}
