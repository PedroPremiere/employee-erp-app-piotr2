import { Injectable } from '@nestjs/common';

import { User } from '@/entities/User';
import { UsersRepository } from '@/repositories/UsersRepository';

@Injectable()
export class IndexUsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    findAll(): Promise<[User[], number]> {
        return this.usersRepository.findAndCount();
    }
}
