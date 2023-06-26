import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/project/prisma/services/PrismaService.service';
import { PaginationQueryDto } from '@/project/dto/Page/PaginationQueryDto';
import { UserDto } from '@/apps/User/dto/UserDto';
import { OrderEnum } from '@/project/types/enums/Order.enum';

@Injectable()
export class IndexUsersService {
    constructor(private readonly prismaService: PrismaService) {}

    findMany(
        query: PaginationQueryDto = {
            page: 1,
            perPage: 14,
            orderBy: 'createdAt',
            orderDirection: OrderEnum.DESC
        }
    ): Promise<UserDto[]> {
        const orderByField = query.orderBy || 'createdAt';
        const orderDirection = query.orderDirection || OrderEnum.DESC;

        const orderBy = {};
        orderBy[orderByField] = orderDirection;

        const take = query.perPage;
        const skip = (query.page - 1) * take;

        return this.prismaService.user.findMany({
            take,
            skip,
            orderBy
        });
    }

    findAll(): Promise<UserDto[]> {
        return this.prismaService.user.findMany();
    }
}
