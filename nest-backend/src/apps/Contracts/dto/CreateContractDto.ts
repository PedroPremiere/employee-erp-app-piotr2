import { ApiProperty } from '@nestjs/swagger';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsInt, IsNotEmpty, Validate } from 'class-validator';

import { IsAfterOrSameDecoratos } from '@/project/validators/date/IsAfterOrSame.decoratos';
import { IsBeforeOrSameDecoratos } from '@/project/validators/date/IsBeforeOrSame.decoratos';
import { ExistingUserDecorator } from '@/apps/User/validators/existing-user-decorator.service';
import { IsNotOverlappingDecorator } from '@/project/validators/contract/is-not-overlapping-decorator.service';

@InputType()
@ArgsType()
export class CreateContractDto {
    @IsNotEmpty({
        message: 'notEmpty'
    })
    @ApiProperty({
        description: 'Name of position',
        example: 'Bus Driver'
    })
    @Field({ nullable: true })
    position: string;

    @IsDateString(
        {},
        {
            message: 'mustBeValidDate'
        }
    )
    @IsNotEmpty({
        message: 'notEmpty'
    })
    @ApiProperty({
        description: 'Start date of contract',
        example: '2023-03-26T21:40:36.000Z'
    })
    @Validate(IsAfterOrSameDecoratos, ['endDate'], {
        message: 'endDateShouldBeAfterStartDate'
    })
    @Field({ nullable: true })
    startDate: string;

    @IsDateString(
        {},
        {
            message: 'mustBeValidDate'
        }
    )
    @IsNotEmpty({
        message: 'notEmpty'
    })
    @ApiProperty({
        description: 'End date of contract',
        example: '2023-03-26T21:40:36.000Z'
    })
    @Validate(IsBeforeOrSameDecoratos, ['startDate'], {
        message: 'startDateShouldBeBeforeEndDate'
    })
    @Field({ nullable: true })
    endDate: string;

    @ApiProperty({
        description: 'User Info (ID)'
    })
    @Validate(ExistingUserDecorator, {
        message: 'userDoesntExist'
    })
    @Validate(IsNotOverlappingDecorator, {
        message: 'overlappingContract'
    })
    @Field({ nullable: true })
    ownerId: string;

    @IsInt({
        message: 'mustBeInteger'
    })
    @IsNotEmpty({
        message: 'notEmpty'
    })
    @ApiProperty({
        description: 'Number of days per year',
        example: 20
    })
    @Field({ nullable: true })
    vacationDaysPerYear: number;

    @IsInt({ message: 'mustBeInteger' })
    @IsNotEmpty({
        message: 'notEmpty'
    })
    vacationDays: number;
}
