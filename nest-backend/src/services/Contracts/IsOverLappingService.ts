import { Injectable } from '@nestjs/common';

import { Contract } from '@/entities/Contract';
import { ContractsRepository } from '@/repositories/ContractsRepository';
import { LessThan, MoreThan } from 'typeorm';

@Injectable()
export class IsOverLappingService {
    constructor(private readonly contractsRepository: ContractsRepository) {}

    async find(contractData: {
        userId: string;
        startDate: Date;
        endDate: Date;
    }): Promise<Contract> {
        const contract = await this.contractsRepository.findOne({
            where: [
                { user: { id: contractData.userId } },
                {
                    user: { id: contractData.userId },
                    endDate: LessThan(contractData.startDate),
                    startDate: MoreThan(contractData.startDate)
                },
                {
                    user: { id: contractData.userId },
                    endDate: MoreThan(contractData.startDate),
                    startDate: LessThan(contractData.startDate)
                },
                {
                    user: { id: contractData.userId },
                    endDate: MoreThan(contractData.endDate),
                    startDate: LessThan(contractData.endDate)
                }
            ]
        });

        return contract;
    }
}
