import { Injectable } from '@nestjs/common';
import { HashPassword } from '@/db/extentions/HashPassword';
import { PrismaService } from '@/apps/PrismaService.service';

@Injectable()
export class PrismaServiceFactory {
    static create() {
        const prismaService = new PrismaService().$extends(HashPassword);

        return prismaService;
    }
}