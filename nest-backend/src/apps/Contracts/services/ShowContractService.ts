import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@Injectable()
export class ShowContractsService {
    constructor(private readonly prismaService: PrismaService) {}

    //todo add type async findOne(id: string): Promise<Contract> {
    async findOne(id: string) {
        const contract = await this.prismaService.contract.findFirst({
            where: { id }
        });

        if (!contract) {
            throw new NotFoundException();
        }

        return contract;
    }
}
