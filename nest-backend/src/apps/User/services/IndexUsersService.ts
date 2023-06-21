import { Injectable } from '@nestjs/common';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@Injectable()
export class IndexUsersService {
    constructor(private readonly prismaService: PrismaService) {}

    /*
    todo add pagination for new orm.
    it is old version
        findAll(query: PaginateQuery): Promise<Paginated<User>> {
            return paginate(query, this.usersRepository, {
                sortableColumns: ['id', 'email', 'createdAt', 'updatedAt'],
                defaultSortBy: [['createdAt', 'DESC']],
                searchableColumns: ['id', 'email', 'createdAt', 'updatedAt'],
                select: ['id', 'email', 'createdAt', 'updatedAt'],
                filterableColumns: {
                    id: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
        }
    
     */
    findAll(query: PaginateQuery) {
        return this.prismaService.user.findMany({});
    }
}
