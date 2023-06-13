import {
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/apps/PrismaService.service';

@ValidatorConstraint({ name: 'DoesUserExist', async: true })
@Injectable()
export class ExistingUserDecorator implements ValidatorConstraintInterface {
    constructor(private readonly prismaService: PrismaService) {}

    async validate(userId: string) {
        if (!userId) {
            return false;
        }

        const userInDB = await this.prismaService.user.findFirst({
            where: { id: userId }
        });

        return !!userInDB;
    }
}
