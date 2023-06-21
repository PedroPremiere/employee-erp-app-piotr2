import { Injectable } from '@nestjs/common';

import { Role } from '@/apps/Roles/entities/Role';
import { CreateRoleDto } from '@/apps/Roles/dto/CreateRoleDto';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@Injectable()
export class CreateRoleService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(roleData: CreateRoleDto): Promise<Role> {
        /*todo : make 2 services : one to create empty group and one for adding users to group
        find way to exclude all password fields
         */

        /*
        todo: adding users like this :
        const connectedUsers = [];

        for (const user of roleData.users) {
            connectedUsers.push({ id: user });
        }

        const role = await this.prismaService.role.create({
            data: { name: roleData.name, users: { connect: connectedUsers } }
        });

         */

        const role = await this.prismaService.role.create({
            data: { name: roleData.name }
        });

        return role;
    }
}
