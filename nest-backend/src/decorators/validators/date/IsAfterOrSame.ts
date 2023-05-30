import * as dayjs from 'dayjs';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

@ValidatorConstraint({ name: 'IsBefore', async: true })
@Injectable()
export class IsAfterOrSame implements ValidatorConstraintInterface {
    async validate(inputDate: string, args: ValidationArguments) {
        const itemToValidate = args.object;
        const propertyName = args.constraints[0];

        const dateToCompare = itemToValidate[propertyName];

        dayjs.extend(isSameOrAfter);

        return dayjs(dateToCompare).isSameOrAfter(inputDate, 'day');
    }

    public defaultMessage(args: ValidationArguments) {
        const inputProperty = args.constraints[0];
        const propertyToCompare = args.property;

        return `${inputProperty} should be after or the same as ${propertyToCompare}`;
    }
}
