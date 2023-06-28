import {
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@ValidatorConstraint({ name: 'DoesUserExist', async: true })
@Injectable()
export class ExistingUsersArrayDecorator
    implements ValidatorConstraintInterface
{
    constructor(private readonly prismaService: PrismaService) {}

    async validate(userIds: string[]) {
        if (!userIds) {
            return false;
        }

        const userInDB = await this.prismaService.user.findFirst({
            where: { id: { in: userIds } }
        });

        return !!userInDB;
    }
}
