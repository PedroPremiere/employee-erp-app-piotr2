import {
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { IsOverLappingService } from '@/apps/Contracts/services/IsOverLappingService';

@ValidatorConstraint({ name: 'IsNotOverlapping', async: true })
@Injectable()
export class IsNotOverlappingDecorator implements ValidatorConstraintInterface {
    constructor(
        protected readonly isOverLappingService: IsOverLappingService
    ) {}

    async validate(ownerId: string | undefined, args) {
        const itemToValidate = args.object;

        const { startDate, endDate, id } = itemToValidate;

        if (!startDate || !endDate || !ownerId) {
            return true;
        }

        const contractInDB = await this.isOverLappingService.find({
            ownerId,
            startDate,
            endDate
        });

        const contractInDBExcludedEdited = contractInDB.filter(item => {
            return item.id !== id;
        });

        return contractInDBExcludedEdited.length === 0;
    }
}
