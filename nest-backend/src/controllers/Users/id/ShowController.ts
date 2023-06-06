import { User } from '@/entities/User';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { UserDto } from '@/dto/User/UserDto';
import { RoutesEnum } from '@/types/enums/Routes.enum';
import { ShowUsersService } from '@/services/Users/ShowUserService';

@ApiTags(RoutesEnum.USERS)
@Controller()
export class ShowController {
    constructor(private usersService: ShowUsersService) {}

    @Get(`${RoutesEnum.USERS}/:id`)
    @ApiOkResponse({ type: UserDto })
    @ApiParam({ name: 'id', description: 'Id of item' })
    invoke(@Param() params: any): Promise<User> {
        return this.usersService.findOne(params.id);
    }
}
