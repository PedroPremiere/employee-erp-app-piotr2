import { ArgsType, Field, InputType } from '@nestjs/graphql';
import {
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsOptional,
    Validate
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsAfterOrSameDecoratos } from '@/project/validators/date/IsAfterOrSame.decoratos';
import { IsBeforeOrSameDecoratos } from '@/project/validators/date/IsBeforeOrSame.decoratos';
import { ExistingUserDecorator } from '@/apps/User/validators/existing-user-decorator.service';
import { IsNotOverlappingDecorator } from '@/project/validators/contract/is-not-overlapping-decorator.service';

@InputType()
@ArgsType()
export class UpdateContractDto {
    @IsNotEmpty({
        message: 'notEmpty'
    })
    @Field({ nullable: true, description: 'ID of item in Database as UUID' })
    id: string;

    @ApiProperty({
        description: 'Name of position',
        example: 'Bus Driver'
    })
    @IsOptional()
    @Field({ nullable: true })
    position?: string;

    @IsDateString(
        {},
        {
            message: 'mustBeValidDate'
        }
    )
    @ApiProperty({
        description: 'Start date of contract',
        example: '2023-03-26T21:40:36.000Z'
    })
    @Validate(IsAfterOrSameDecoratos, ['endDate'], {
        message: 'endDateShouldBeAfterStartDate'
    })
    @IsOptional()
    @Field({ nullable: true })
    startDate?: string;

    @IsDateString(
        {},
        {
            message: 'mustBeValidDate'
        }
    )
    @ApiProperty({
        description: 'End date of contract',
        example: '2023-03-26T21:40:36.000Z'
    })
    @Validate(IsBeforeOrSameDecoratos, ['startDate'], {
        message: 'startDateShouldBeBeforeEndDate'
    })
    @IsOptional()
    @Field({ nullable: true })
    endDate?: string;

    @ApiProperty({
        description: 'User Info (ID)'
    })
    @Validate(ExistingUserDecorator, {
        message: 'userDoesntExist'
    })
    @Validate(IsNotOverlappingDecorator, {
        message: 'overlappingContract'
    })
    @IsOptional()
    @Field({ nullable: true })
    ownerId?: string;

    @IsInt({
        message: 'mustBeInteger'
    })
    @ApiProperty({
        description: 'Number of days per year',
        example: 20
    })
    @IsOptional()
    @Field({ nullable: true })
    vacationDaysPerYear?: number;

    @IsInt({ message: 'mustBeInteger' })
    vacationDays?: number;
}
