import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/project/prisma/services/PrismaService.service';
import { RoleDto } from '@/apps/Roles/dto/RoleDto';
import { UserDto } from '@/apps/User/dto/UserDto';

@Injectable()
export class ShowRoleService {
    constructor(private readonly prismaService: PrismaService) {}

    async findOne(id: string): Promise<RoleDto> {
        if (!id) {
            throw new NotFoundException();
        }

        const user = await this.prismaService.role.findFirst({
            where: { id }
        });

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    findUsers(id: string): Promise<UserDto[]> {
        return this.prismaService.role
            .findFirst({
                where: { id }
            })
            .users();
    }
}
