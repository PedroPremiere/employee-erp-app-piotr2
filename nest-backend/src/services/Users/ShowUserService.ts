import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@/entities/User';
import { UsersRepository } from '@/repositories/UsersRepository';

@Injectable()
export class ShowUsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async findOne(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }
}
