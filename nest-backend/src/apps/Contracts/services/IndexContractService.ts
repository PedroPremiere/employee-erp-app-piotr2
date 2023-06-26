import { Injectable } from '@nestjs/common';

import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';
import { PaginationQueryDto } from '@/project/dto/Page/PaginationQueryDto';
import { OrderEnum } from '@/project/types/enums/Order.enum';
import { ContractDto } from '@/apps/Contracts/dto/ContractDto';

@Injectable()
export class IndexContractService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(): Promise<ContractDto[]> {
        return this.prismaService.contract.findMany();
    }

    findMany(
        query: PaginationQueryDto = {
            page: 1,
            perPage: 14,
            orderBy: 'createdAt',
            orderDirection: OrderEnum.DESC
        }
    ): Promise<ContractDto[]> {
        const orderByField = query.orderBy || 'createdAt';
        const orderDirection = query.orderDirection || OrderEnum.DESC;

        const orderBy = {};
        orderBy[orderByField] = orderDirection;

        const take = query.perPage;
        const skip = (query.page - 1) * take;

        return this.prismaService.contract.findMany({
            take,
            skip,
            orderBy
        });
    }
}
