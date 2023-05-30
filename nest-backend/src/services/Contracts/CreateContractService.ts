import { Injectable } from '@nestjs/common';

import { Contract } from '@/entities/Contract';
import { CreateContractDto } from '@/dto/Contract/CreateContractDto';
import { ContractsRepository } from '@/repositories/ContractsRepository';

@Injectable()
export class CreateContractService {
    constructor(private readonly contractsRepository: ContractsRepository) {}

    async create(contractData: CreateContractDto): Promise<Contract> {
        const contract = await this.contractsRepository.save(contractData);

        const contractAfterSave = await this.contractsRepository.findOne({
            where: { id: contract.id },

            select: {
                user: {
                    id: true
                }
            },
            relations: ['user']
        });

        return contractAfterSave;
    }
}
