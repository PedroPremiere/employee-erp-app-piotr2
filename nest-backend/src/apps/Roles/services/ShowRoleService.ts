import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/apps/PrismaService.service';

@Injectable()
export class ShowRoleService {
    constructor(private readonly prismaService: PrismaService) {}

    async findOne(id: string) {
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

    async findUsers(id: string) {
        const users = await this.prismaService.role
            .findFirst({
                where: { id }
            })
            .users();

        return users;
    }
}
