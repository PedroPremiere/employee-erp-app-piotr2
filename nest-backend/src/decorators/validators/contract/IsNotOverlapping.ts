import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { User } from '@/entities/User';
import { IsOverLappingService } from '@/services/Contracts/IsOverLappingService';
import { CreateContractDto } from '@/dto/Contract/CreateContractDto';

@ValidatorConstraint({ name: 'IsNotOverlapping', async: true })
@Injectable()
export class IsNotOverlapping implements ValidatorConstraintInterface {
    constructor(
        protected readonly isOverLappingService: IsOverLappingService
    ) {}

    async validate(tmpUser: User | undefined, args: ValidationArguments) {
        const itemToValidate = args.object;

        const { startDate, endDate, user } =
            itemToValidate as CreateContractDto;

        if (!startDate || !endDate || !user) {
            return true;
        }

        const contractInDB = await this.isOverLappingService.find({
            userId: tmpUser.id,
            startDate,
            endDate
        });

        return !contractInDB;
    }

    public defaultMessage() {
        return 'User has already overlapping contract';
    }
}
