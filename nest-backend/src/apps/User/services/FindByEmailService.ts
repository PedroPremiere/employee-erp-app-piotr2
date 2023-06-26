import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@Injectable()
export class FindByEmailService {
    constructor(private readonly prismaService: PrismaService) {}

    findByEmail(email: string) {
        return this.prismaService.user.findFirst({
            where: { email }
        });
    }
}
