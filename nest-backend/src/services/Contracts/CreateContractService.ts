import { Injectable } from '@nestjs/common';

import { CreateContractDto } from '@/dto/Contract/CreateContractDto';
import { PrismaService } from '@/services/PrismaService.service';

@Injectable()
export class CreateContractService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(contractData: CreateContractDto) {
        return this.prismaService.contract.create({
            data: contractData
        });
    }
}
