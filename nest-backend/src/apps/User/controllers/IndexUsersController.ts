import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

import { RoutesEnum } from '@/project/types/enums/Routes.enum';
import { IndexUsersService } from '@/apps/User/services/IndexUsersService';

@ApiTags(RoutesEnum.USERS)
@Controller()
export class IndexUsersController {
    constructor(private usersService: IndexUsersService) {}

    @Get(RoutesEnum.USERS)
    //todo invoke(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    invoke(@Paginate() query: PaginateQuery) {
        return this.usersService.findAll(query);
    }
}
