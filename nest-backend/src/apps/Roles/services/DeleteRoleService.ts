import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@Injectable()
export class DeleteRoleService {
    constructor(private readonly prismaService: PrismaService) {}

    async delete(id: string): Promise<{ message: string }> {
        const user = await this.prismaService.role.findFirst({
            where: { id }
        });

        if (!user) {
            throw new NotFoundException();
        }

        await this.prismaService.role.delete({ where: { id } });

        return { message: 'removed' };
    }
}
