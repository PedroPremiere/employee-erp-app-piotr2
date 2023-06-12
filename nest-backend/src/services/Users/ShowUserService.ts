import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@/entities/User';
import { PrismaService } from '@/services/PrismaService.service';

@Injectable()
export class ShowUsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async findOne(id: string): Promise<User> {
        const user = await this.prismaService.user.findFirst({
            where: { id }
        });

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }
}
