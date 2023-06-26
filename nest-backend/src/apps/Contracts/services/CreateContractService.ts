import { Injectable } from '@nestjs/common';

import { CreateContractDto } from '@/apps/Contracts/dto/CreateContractDto';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';
import { ContractDto } from '@/apps/Contracts/dto/ContractDto';

@Injectable()
export class CreateContractService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(contractData: CreateContractDto): Promise<ContractDto> {
        return this.prismaService.contract.create({
            data: contractData
        });
    }
}
