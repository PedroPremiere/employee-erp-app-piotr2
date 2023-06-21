import { Injectable } from '@nestjs/common';

import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@Injectable()
export class IndexContractService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(query: PaginateQuery) {
        const contracts = await this.prismaService.contract.findMany({});

        return contracts;
    }

    /*
    todo implement pagination. similar to this:
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
        
     */
}
