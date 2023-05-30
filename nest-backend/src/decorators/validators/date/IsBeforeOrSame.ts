import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import * as dayjs from 'dayjs';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

@ValidatorConstraint({ name: 'IsBefore', async: true })
@Injectable()
export class IsBeforeOrSame implements ValidatorConstraintInterface {
    async validate(inputDate: string, args: ValidationArguments) {
        const itemToValidate = args.object;
        const propertyName = args.constraints[0];

        const dateToCompare = itemToValidate[propertyName];

        dayjs.extend(isSameOrBefore);

        return dayjs(dateToCompare).isSameOrBefore(inputDate, 'day');
    }

    public defaultMessage(args: ValidationArguments) {
        const inputProperty = args.constraints[0];
        const propertyToCompare = args.property;

        return `${inputProperty} should be before or the same as ${propertyToCompare}`;
    }
}
