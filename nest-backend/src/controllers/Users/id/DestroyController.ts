import { Controller, Delete, HttpCode, Param } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { Routes } from '@/types/enums/Routes';
import { DeleteUsersService } from '@/services/Users/DeleteUsersService';

@ApiTags(Routes.USERS)
@Controller(`/api/${Routes.USERS}`)
export class DeleteController {
    constructor(private usersService: DeleteUsersService) {}

    @Delete(':id')
    @HttpCode(204)
    invoke(@Param() params: any): Promise<{ message: string }> {
        return this.usersService.delete(params.id);
    }
}
