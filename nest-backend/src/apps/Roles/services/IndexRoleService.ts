import { Injectable } from '@nestjs/common';

import { OrderEnum } from '@/project/types/enums/Order.enum';
import { PaginationQueryDto } from '@/project/dto/Page/PaginationQueryDto';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';
import { RoleDto } from '@/apps/Roles/dto/RoleDto';

@Injectable()
export class IndexRoleService {
    constructor(private readonly prismaService: PrismaService) {}

    findMany(
        query: PaginationQueryDto = {
            page: 1,
            perPage: 14,
            orderBy: 'createdAt',
            orderDirection: OrderEnum.DESC
        }
    ): Promise<RoleDto[]> {
        const orderByField = query.orderBy || 'createdAt';
        const orderDirection = query.orderDirection || OrderEnum.DESC;

        const orderBy = {};
        orderBy[orderByField] = orderDirection;

        const take = query.perPage;
        const skip = (query.page - 1) * take;

        return this.prismaService.role.findMany({
            take,
            skip,
            orderBy
        });
    }

    findAll(): Promise<RoleDto[]> {
        return this.prismaService.role.findMany();
    }
}
