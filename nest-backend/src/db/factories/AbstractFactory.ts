import { PrismaServiceFactory } from '@/services/PrismaServiceFactory.service';

export class AbstractFactory {
    static prisma = PrismaServiceFactory.create();
}
