import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Contract } from '@/entities/Contract';

@Injectable()
export class ContractsRepository extends Repository<Contract> {
    constructor(private dataSource: DataSource) {
        super(Contract, dataSource.createEntityManager());
    }
}
