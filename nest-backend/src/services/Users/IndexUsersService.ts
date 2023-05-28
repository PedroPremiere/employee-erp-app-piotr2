import { Injectable } from '@nestjs/common';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

import { User } from '@/entities/User';
import { UsersRepository } from '@/repositories/UsersRepository';

@Injectable()
export class IndexUsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

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
}
