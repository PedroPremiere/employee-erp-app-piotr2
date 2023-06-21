import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@Injectable()
export class ShowUsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async findOne(id: string) {
        if (!id) {
            throw new NotFoundException();
        }

        const user = await this.prismaService.user.findFirst({
            where: { id }
        });

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    async findContracts(id: string) {
        const contracts = await this.prismaService.user
            .findFirst({
                where: { id }
            })
            .contracts();

        return contracts;
    }
}
