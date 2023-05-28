import { Controller, Get } from '@nestjs/common';
import { ApiExtraModels, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

import { User } from '@/entities/User';
import { UserDto } from '@/dto/User/UserDto';
import { Routes } from '@/types/enums/Routes';
import { IndexUsersService } from '@/services/Users/IndexUsersService';
import { ApiPaginatedResponse } from '@/decorators/ApiPaginatedResponse';
import { PaginationQueryDto } from '@/dto/Page/PaginationQueryDto';

@ApiTags(Routes.USERS)
@Controller()
export class IndexUsersController {
    constructor(private usersService: IndexUsersService) {}

    @Get(Routes.USERS)
    @ApiPaginatedResponse(UserDto)
    @ApiExtraModels(UserDto)
    @ApiQuery({ type: PaginationQueryDto })
    invoke(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
        return this.usersService.findAll(query);
    }
}
