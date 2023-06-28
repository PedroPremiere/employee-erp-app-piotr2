import { Injectable } from '@nestjs/common';

import { EditUserToRoleDto } from '@/apps/Roles/dto/EditUserToRoleDto';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@Injectable()
export class RemoveUserFromRoleService {
    constructor(private readonly prismaService: PrismaService) {}

    async removeUserFromRole(
        inputData: EditUserToRoleDto
    ): Promise<{ message: string }> {
        const userIds = [];

        for (const userId of inputData.userIds) {
            userIds.push({ id: userId });
        }

        for (const role of inputData.roleIds) {
            await this.prismaService.role.update({
                where: { id: role },
                data: { users: { disconnect: userIds } }
            });
        }

        return { message: 'ok' };
    }
}
