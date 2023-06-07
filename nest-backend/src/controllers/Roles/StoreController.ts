import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

import { Role } from '@/entities/Role';
import { RoutesEnum } from '@/types/enums/Routes.enum';
import { CreateRoleDto } from '@/dto/Role/CreateRoleDto';
import { CreateRoleService } from '@/services/Roles/CreateRoleService';

//todo many changes here
@ApiTags(RoutesEnum.ROLES)
@Controller()
export class StoreController {
    constructor(private createRoleService: CreateRoleService) {}

    @Post(RoutesEnum.ROLES)
    invoke(@Body() roleData: CreateRoleDto): Promise<Role> {
        return this.createRoleService.create(roleData);
    }
}
