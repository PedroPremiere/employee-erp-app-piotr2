import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@/entities/User';
import { UsersRepository } from '@/repositories/UsersRepository';
import { CreateUserDto } from '@/dto/User/CreateUserDto';

@Injectable()
export class CreateUserService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async create(userData: CreateUserDto): Promise<User> {
        const user = await this.usersRepository.save(userData);

        const userAfterSave = await this.usersRepository.findOne({
            where: { id: user.id }
        });

        return userAfterSave;
    }
}
