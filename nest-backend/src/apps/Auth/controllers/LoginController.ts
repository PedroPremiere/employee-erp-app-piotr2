import {
    Controller,
    Request,
    Post,
    UseGuards,
    HttpCode,
    Body
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { RoutesEnum } from '@/project/types/enums/Routes.enum';
import { LoginDto } from '@/apps/User/dto/LoginDto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from '@/apps/Auth/services/AuthService';
import { LoginResponseDto } from '@/apps/Auth/dto/LoginResponseDto';

@Controller()
export class LoginController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post(RoutesEnum.LOGIN)
    @HttpCode(200)
    @ApiOkResponse({
        status: 200,
        description: 'Login success',
        type: LoginResponseDto
    })
    @ApiBody({ type: LoginDto })
    async invoke(@Body() userData: LoginDto) {
        return this.authService.login(userData);
    }
}
