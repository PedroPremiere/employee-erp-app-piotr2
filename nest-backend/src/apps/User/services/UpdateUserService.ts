import { Injectable, NotFoundException } from '@nestjs/common';

import { UserDto } from '@/apps/User/dto/UserDto';
import { UpdateUserDto } from '@/apps/User/dto/UpdateUserDto';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@Injectable()
export class UpdateUserService {
    constructor(private readonly prismaService: PrismaService) {}

    async update(userData: UpdateUserDto): Promise<UserDto> {
        const role = await this.prismaService.user.findFirst({
            where: { id: userData.id }
        });

        if (!role) {
            throw new NotFoundException();
        }

        return this.prismaService.user.update({
            data: userData,
            where: { id: userData.id }
        });
    }
}
