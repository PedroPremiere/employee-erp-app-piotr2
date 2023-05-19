import { Injectable } from '@nestjs/common';

import { User } from '@/entities/User';
import { CreateUserDto } from '@/dto/User/CreateUserDto';
import { UsersRepository } from '@/repositories/UsersRepository';

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
