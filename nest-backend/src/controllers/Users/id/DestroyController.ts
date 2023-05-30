import { Controller, Delete, HttpCode, Param } from '@nestjs/common';

import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Routes } from '@/types/enums/Routes';
import { DeleteUsersService } from '@/services/Users/DeleteUsersService';

@ApiTags(Routes.USERS)
@Controller()
export class DeleteController {
    constructor(private usersService: DeleteUsersService) {}

    @Delete(`${Routes.USERS}/:id`)
    @ApiOkResponse({ status: 204, schema: {} })
    @HttpCode(204)
    invoke(@Param() params: any): Promise<{ message: string }> {
        return this.usersService.delete(params.id);
    }
}