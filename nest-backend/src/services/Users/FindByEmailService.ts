import { Injectable } from '@nestjs/common';

import { User } from '@/entities/User';
import { UsersRepository } from '@/repositories/UsersRepository';

@Injectable()
export class FindByEmailService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async findByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password']
        });

        return user;
    }
}
