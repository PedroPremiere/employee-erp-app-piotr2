import { PrismaServiceFactory } from '@/apps/Auth/PrismaServiceFactory.service';

export class AbstractFactory {
    static prisma = PrismaServiceFactory.create();
}
