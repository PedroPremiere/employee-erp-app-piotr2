import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, Validate } from 'class-validator';

import { i18nValidationMessage } from 'nestjs-i18n';

import { User } from '@/entities/User';
import { ExistingUserDecorator } from '@/decorators/validators/user/existing-user-decorator.service';
import { IsAfterOrSameDecoratos } from '@/decorators/validators/date/IsAfterOrSame.decoratos';
import { IsBeforeOrSameDecoratos } from '@/decorators/validators/date/IsBeforeOrSame.decoratos';
import { IsNotOverlappingDecorator } from '@/decorators/validators/contract/is-not-overlapping-decorator.service';

export class CreateContractDto {
    @IsNotEmpty({
        message: i18nValidationMessage('errors.notEmpty')
    })
    @ApiProperty({
        description: 'Name of position',
        example: 'Bus Driver'
    })
    position: string;

    @IsDateString(
        {},
        {
            message: i18nValidationMessage('errors.mustBeValidDate')
        }
    )
    @IsNotEmpty({
        message: i18nValidationMessage('errors.notEmpty')
    })
    @ApiProperty({
        description: 'Start date of contract',
        example: '2023-03-26T21:40:36.000Z'
    })
    @Validate(IsAfterOrSameDecoratos, ['endDate'], {
        message: i18nValidationMessage('errors.endDateShouldBeAfterStartDate')
    })
    startDate: Date;

    @IsDateString(
        {},
        {
            message: i18nValidationMessage('errors.mustBeValidDate')
        }
    )
    @IsNotEmpty({
        message: i18nValidationMessage('errors.notEmpty')
    })
    @ApiProperty({
        description: 'End date of contract',
        example: '2023-03-26T21:40:36.000Z'
    })
    @Validate(IsBeforeOrSameDecoratos, ['startDate'], {
        message: i18nValidationMessage('errors.startDateShouldBeBeforeEndDate')
    })
    endDate: Date;

    @ApiProperty({
        description: 'User Info (ID)'
    })
    @Validate(ExistingUserDecorator, {
        message: i18nValidationMessage('errors.userDoesntExist')
    })
    @Validate(IsNotOverlappingDecorator, {
        message: i18nValidationMessage('errors.overlappingContract')
    })
    ownerId: string;

    @IsInt({
        message: i18nValidationMessage('errors.mustBeInteger')
    })
    @IsNotEmpty({
        message: i18nValidationMessage('errors.notEmpty')
    })
    @ApiProperty({
        description: 'Number of days per year',
        example: 20
    })
    vacationDaysPerYear: number;

    @IsInt({ message: i18nValidationMessage('errors.mustBeInteger') })
    @IsNotEmpty({
        message: i18nValidationMessage('errors.notEmpty')
    })
    vacationDays: number;
}
