import { Injectable } from '@nestjs/common';

import { User } from '@/entities/User';
import { CreateUserDto } from '@/dto/User/CreateUserDto';
import { PrismaService } from '@/services/PrismaService.service';

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
