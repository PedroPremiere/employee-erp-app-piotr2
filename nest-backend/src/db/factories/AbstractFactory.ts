import { PrismaServiceFactory } from '@/project/prisma/factories/PrismaServiceFactory.service';

export class AbstractFactory {
    static prisma = PrismaServiceFactory.create();
}
