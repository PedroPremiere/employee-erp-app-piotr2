import { Injectable } from '@nestjs/common';
import { HashPassword } from '@/db/extentions/HashPassword';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@Injectable()
export class PrismaServiceFactory {
    static create() {
        const prismaService = new PrismaService().$extends(HashPassword);

        return prismaService;
    }
}
