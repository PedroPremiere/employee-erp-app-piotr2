import { Injectable } from '@nestjs/common';

import { ContractsRepository } from '@/repositories/ContractsRepository';
import { Contract } from '@/entities/Contract';

@Injectable()
export class IndexContractService {
    constructor(private readonly contractsRepository: ContractsRepository) {}

    findAll(): Promise<[Contract[], number]> {
        return this.contractsRepository.findAndCount();
    }
}
