import { Injectable, NotFoundException } from '@nestjs/common';

import { UserDto } from '@/apps/User/dto/UserDto';
import { ContractDto } from '@/apps/Contracts/dto/ContractDto';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@Injectable()
export class ShowContractsService {
    constructor(private readonly prismaService: PrismaService) {}

    async findOne(id: string): Promise<ContractDto> {
        const contract = await this.prismaService.contract.findFirst({
            where: { id }
        });

        if (!contract) {
            throw new NotFoundException();
        }

        return contract;
    }

    async findUser(id: string): Promise<UserDto> {
        return await this.prismaService.contract
            .findFirst({
                where: { id }
            })
            .user();
    }
}
