import { Injectable, NotFoundException } from '@nestjs/common';

import { UserDto } from '@/apps/User/dto/UserDto';
import { ContractDto } from '@/apps/Contracts/dto/ContractDto';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@Injectable()
export class ShowUsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async findOne(id: string): Promise<UserDto> {
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

    async findContracts(id: string): Promise<ContractDto[]> {
        return this.prismaService.user
            .findFirst({
                where: { id }
            })
            .contracts();
    }
}
