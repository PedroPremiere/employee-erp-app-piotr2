import {
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@ValidatorConstraint({ name: 'DoesRoleExist', async: true })
@Injectable()
export class ExistingRolesArrayDecorator
    implements ValidatorConstraintInterface
{
    constructor(private readonly prismaService: PrismaService) {}

    async validate(rolesIds: string[]) {
        if (!rolesIds) {
            return false;
        }

        const rolesInDB = await this.prismaService.role.findFirst({
            where: { id: { in: rolesIds } }
        });

        return !!rolesInDB;
    }
}
