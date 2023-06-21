import {
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@ValidatorConstraint({ name: 'DoesUserExist', async: true })
@Injectable()
export class ExistingUsersDecorator implements ValidatorConstraintInterface {
    constructor(private readonly prismaService: PrismaService) {}

    async validate(usersId: string[]) {
        if (!usersId || usersId.length === 0) {
            return true;
        }

        console.log(usersId);

        const userInDB = await this.prismaService.user.findMany({
            where: { id: { in: usersId } }
        });

        return !!userInDB;
    }
}
