import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/apps/PrismaService.service';

@Injectable()
export class FindByEmailService {
    constructor(private readonly prismaService: PrismaService) {}

    async findByEmail(email: string) {
        const user = await this.prismaService.user.findFirst({
            where: { email }
        });

        return user;
    }
}
