import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

import { Role } from '@/apps/Roles/entities/Role';
import { RoutesEnum } from '@/project/types/enums/Routes.enum';
import { CreateRoleDto } from '@/apps/Roles/dto/CreateRoleDto';
import { CreateRoleService } from '@/apps/Roles/services/CreateRoleService';

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
