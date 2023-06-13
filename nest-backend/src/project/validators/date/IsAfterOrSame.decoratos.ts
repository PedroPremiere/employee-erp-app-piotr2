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
export class IsAfterOrSameDecoratos implements ValidatorConstraintInterface {
    async validate(inputDate: string, args: ValidationArguments) {
        const itemToValidate = args.object;
        const propertyName = args.constraints[0];

        const dateToCompare = itemToValidate[propertyName];

        dayjs.extend(isSameOrAfter);

        return dayjs(dateToCompare).isSameOrAfter(inputDate, 'day');
    }
}
