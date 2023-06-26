import { Injectable } from '@nestjs/common';

import { Role } from '@/apps/Roles/entities/Role';
import { CreateRoleDto } from '@/apps/Roles/dto/CreateRoleDto';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@Injectable()
export class CreateRoleService {
    constructor(private readonly prismaService: PrismaService) {}

    create(roleData: CreateRoleDto): Promise<Role> {
        return this.prismaService.role.create({
            data: { name: roleData.name }
        });
    }
}
