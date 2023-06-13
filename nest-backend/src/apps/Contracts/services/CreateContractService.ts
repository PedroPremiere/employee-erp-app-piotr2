import { Injectable } from '@nestjs/common';

import { CreateContractDto } from '@/apps/Contracts/dto/CreateContractDto';
import { PrismaService } from '@/apps/PrismaService.service';

@Injectable()
export class CreateContractService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(contractData: CreateContractDto) {
        return this.prismaService.contract.create({
            data: contractData
        });
    }
}
