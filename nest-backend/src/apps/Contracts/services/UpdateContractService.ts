import { Injectable, NotFoundException } from '@nestjs/common';

import { ContractDto } from '@/apps/Contracts/dto/ContractDto';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';
import { UpdateContractDto } from '@/apps/Contracts/dto/UpdateContractDto';

@Injectable()
export class UpdateContractService {
    constructor(private readonly prismaService: PrismaService) {}

    async update(contractData: UpdateContractDto): Promise<ContractDto> {
        const contract = await this.prismaService.contract.findFirst({
            where: { id: contractData.id }
        });

        if (!contract) {
            throw new NotFoundException();
        }

        return this.prismaService.contract.update({
            data: contractData,
            where: { id: contractData.id }
        });
    }
}
