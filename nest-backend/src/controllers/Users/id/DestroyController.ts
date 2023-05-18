import { Controller, Delete, HttpCode, Param } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { DeleteUsersService } from '@/services/Users/DeleteUsersService';

@ApiTags('users')
@Controller('api/users/')
export class DeleteController {
    constructor(private usersService: DeleteUsersService) {}

    @Delete(':id')
    @HttpCode(204)
    invoke(@Param() params: any): Promise<{ message: string }> {
        return this.usersService.delete(params.id);
    }
}
