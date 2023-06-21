import { Injectable } from '@nestjs/common';

import type { User } from '@prisma/client';

import { CreateUserDto } from '@/apps/User/dto/CreateUserDto';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@Injectable()
export class CreateUserService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(userData: CreateUserDto): Promise<User> {
        const user = await this.prismaService.user.create({
            data: {
                email: userData.email
            }
        });

        await this.prismaService.password.create({
            data: {
                password: userData.password,
                user: { connect: { id: user.id } }
            }
        });

        return user;
    }
}
