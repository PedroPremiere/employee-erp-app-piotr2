import { User } from '@/apps/User/entities/User';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { RoutesEnum } from '@/project/types/enums/Routes.enum';
import { ShowUsersService } from '@/apps/User/services/ShowUserService';

/*
todo remove
 */

@ApiTags(RoutesEnum.USERS)
@Controller()
export class ShowController {
    constructor(private usersService: ShowUsersService) {}

    @Get(`${RoutesEnum.USERS}/:id`)
    @ApiParam({ name: 'id', description: 'Id of item' })
    invoke(@Param() params: any): Promise<User> {
        return this.usersService.findOne(params.id);
    }
}
