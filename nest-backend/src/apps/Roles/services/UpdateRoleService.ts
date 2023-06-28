import { Injectable, NotFoundException } from '@nestjs/common';

import { RoleDto } from '@/apps/Roles/dto/RoleDto';
import { UpdateRoleDto } from '@/apps/Roles/dto/UpdateRoleDto';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@Injectable()
export class UpdateRoleService {
    constructor(private readonly prismaService: PrismaService) {}

    async update(roleData: UpdateRoleDto): Promise<RoleDto> {
        const role = await this.prismaService.role.findFirst({
            where: { id: roleData.id }
        });

        if (!role) {
            throw new NotFoundException();
        }

        return this.prismaService.role.update({
            data: roleData,
            where: { id: roleData.id }
        });
    }
}
