import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Request } from '@nestjs/common';

import { RoutesEnum } from '@/types/enums/Routes.enum';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { UserDto } from '@/dto/User/UserDto';

@ApiTags(RoutesEnum.ME)
@Controller()
export class ProfileController {
    @Get(RoutesEnum.ME)
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: UserDto })
    invoke(@Request() req) {
        return req.user;
    }
}
