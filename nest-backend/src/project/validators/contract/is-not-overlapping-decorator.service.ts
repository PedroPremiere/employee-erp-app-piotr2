import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { User } from '@/apps/User/entities/User';
import { IsOverLappingService } from '@/apps/Contracts/services/IsOverLappingService';
import { CreateContractDto } from '@/apps/Contracts/dto/CreateContractDto';

@ValidatorConstraint({ name: 'IsNotOverlapping', async: true })
@Injectable()
export class IsNotOverlappingDecorator implements ValidatorConstraintInterface {
    constructor(
        protected readonly isOverLappingService: IsOverLappingService
    ) {}

    async validate(ownerId: string | undefined, args) {
        const itemToValidate = args.object;

        const { startDate, endDate } = itemToValidate;

        if (!startDate || !endDate || !ownerId) {
            return true;
        }

        const contractInDB = await this.isOverLappingService.find({
            ownerId,
            startDate,
            endDate
        });

        return contractInDB.length === 0;
    }
}
