import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsTheSame', async: true })
@Injectable()
export class IsTheSameDecorator implements ValidatorConstraintInterface {
    async validate(input: string, args: ValidationArguments) {
        const itemToValidate = args.object;
        const propertyName = args.constraints[0];

        const propertyToCompare = itemToValidate[propertyName];

        return propertyToCompare === input;
    }
}
