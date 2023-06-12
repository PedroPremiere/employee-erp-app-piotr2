import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/services/PrismaService.service';

@Injectable()
export class FindByEmailService {
    constructor(private readonly prismaService: PrismaService) {}

    // todo add returned type
    async findByEmail(email: string) {
        const user = await this.prismaService.user.findFirst({
            where: { email }
        });

        return user;
    }
}
