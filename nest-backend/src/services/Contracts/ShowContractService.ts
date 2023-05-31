import { Injectable, NotFoundException } from '@nestjs/common';

import { Contract } from '@/entities/Contract';
import { ContractsRepository } from '@/repositories/ContractsRepository';

@Injectable()
export class ShowContractsService {
    constructor(private readonly contractsRepository: ContractsRepository) {}

    async findOne(id: string): Promise<Contract> {
        const contract = await this.contractsRepository.findOne({
            where: { id },

            select: {
                user: {
                    id: true
                }
            },
            relations: ['user']
        });

        if (!contract) {
            throw new NotFoundException();
        }

        return contract;
    }
}
