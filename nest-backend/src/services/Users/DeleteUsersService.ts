import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersRepository } from '@/repositories/UsersRepository';

@Injectable()
export class DeleteUsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async delete(id: string): Promise<{ message: string }> {
        const user = await this.usersRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException();
        }

        await this.usersRepository.delete({ id });

        return { message: 'removed' };
    }
}
