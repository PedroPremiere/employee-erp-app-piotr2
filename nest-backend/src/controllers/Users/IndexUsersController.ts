import { Controller, Get } from '@nestjs/common';
import { ApiExtraModels, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

import { UserDto } from '@/dto/User/UserDto';
import { RoutesEnum } from '@/types/enums/Routes.enum';
import { IndexUsersService } from '@/services/Users/IndexUsersService';
import { ApiPaginatedResponseDecoratos } from '@/decorators/ApiPaginatedResponse.decoratos';
import { PaginationQueryDto } from '@/dto/Page/PaginationQueryDto';

@ApiTags(RoutesEnum.USERS)
@Controller()
export class IndexUsersController {
    constructor(private usersService: IndexUsersService) {}

    @Get(RoutesEnum.USERS)
    @ApiPaginatedResponseDecoratos(UserDto)
    @ApiExtraModels(UserDto)
    @ApiQuery({ type: PaginationQueryDto })
    //todo invoke(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
    invoke(@Paginate() query: PaginateQuery) {
        return this.usersService.findAll(query);
    }
}
