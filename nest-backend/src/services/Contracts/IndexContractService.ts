import { Injectable } from '@nestjs/common';

import { ContractsRepository } from '@/repositories/ContractsRepository';
import { Contract } from '@/entities/Contract';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class IndexContractService {
    constructor(private readonly contractsRepository: ContractsRepository) {}

    findAll(query: PaginateQuery): Promise<Paginated<Contract>> {
        return paginate(query, this.contractsRepository, {
            sortableColumns: [
                'id',
                'position',
                'startDate',
                'endDate',
                'vacationDaysPerYear',
                'vacationDays',
                'createdAt',
                'updatedAt'
            ],
            defaultSortBy: [['createdAt', 'DESC']],
            searchableColumns: [
                'id',
                'position',
                'startDate',
                'endDate',
                'vacationDaysPerYear',
                'vacationDays',
                'createdAt',
                'updatedAt'
            ],
            select: [
                'id',
                'position',
                'startDate',
                'endDate',
                'user.id',
                'vacationDaysPerYear',
                'vacationDays',
                'createdAt',
                'updatedAt'
            ],
            relations: ['user'],

            filterableColumns: {
                id: true,
                position: true,
                startDate: true,
                endDate: true,
                user: true,
                vacationDaysPerYear: true,
                vacationDays: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }
}
