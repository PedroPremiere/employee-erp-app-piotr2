import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, Validate } from 'class-validator';

import { i18nValidationMessage } from 'nestjs-i18n';

import { User } from '@/entities/User';
import { ExistingUser } from '@/decorators/validators/user/ExistingUser';
import { IsAfterOrSame } from '@/decorators/validators/date/IsAfterOrSame';
import { IsBeforeOrSame } from '@/decorators/validators/date/IsBeforeOrSame';
import { IsNotOverlapping } from '@/decorators/validators/contract/IsNotOverlapping';

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
    @Validate(IsAfterOrSame, ['endDate'], {
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
    @Validate(IsBeforeOrSame, ['startDate'], {
        message: i18nValidationMessage('errors.startDateShouldBeBeforeEndDate')
    })
    endDate: Date;

    @ApiProperty({
        description: 'User Info (ID)'
    })
    @Validate(ExistingUser, {
        message: i18nValidationMessage('errors.userDoesntExist')
    })
    @Validate(IsNotOverlapping, {
        message: i18nValidationMessage('errors.overlappingContract')
    })
    user: User;

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
