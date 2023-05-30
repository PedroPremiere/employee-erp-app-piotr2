import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, Validate } from 'class-validator';

import { User } from '@/entities/User';
import { DoesUserExist } from '@/decorators/validators/user/DoesUserExist';
import { IsAfterOrSame } from '@/decorators/validators/date/IsAfterOrSame';
import { IsBeforeOrSame } from '@/decorators/validators/date/IsBeforeOrSame';
import { IsNotOverlapping } from '@/decorators/validators/contract/IsNotOverlapping';

export class CreateContractDto {
    @IsNotEmpty({
        message: 'Should not be empty'
    })
    @ApiProperty({
        description: 'Name of position',
        example: 'Bus Driver'
    })
    position: string;

    @IsDateString()
    @IsNotEmpty({
        message: 'Should not be empty'
    })
    @ApiProperty({
        description: 'Start date of contract',
        example: '2023-03-26T21:40:36.000Z'
    })
    @Validate(IsAfterOrSame, ['endDate'])
    startDate: Date;

    @IsDateString()
    @IsNotEmpty({
        message: 'Should not be empty'
    })
    @ApiProperty({
        description: 'End date of contract',
        example: '2023-03-26T21:40:36.000Z'
    })
    @Validate(IsBeforeOrSame, ['startDate'])
    endDate: Date;

    @ApiProperty({
        description: 'User Info (ID)'
    })
    @Validate(DoesUserExist)
    @Validate(IsNotOverlapping)
    user: User;

    @IsInt()
    @IsNotEmpty({
        message: 'Should not be empty'
    })
    @ApiProperty({
        description: 'Number of days per year',
        example: 20
    })
    vacationDaysPerYear: number;

    @IsInt()
    @IsNotEmpty({
        message: 'Should not be empty'
    })
    @ApiProperty({
        description: 'Number of days employee can use',
        example: 10
    })
    vacationDays: number;
    /*
    todo add autofill , like this : https://stackoverflow.com/questions/58308289/auto-fill-dto-fields-with-other-data-than-request-body-data
     it will be calculated according to contract len and vacation days per year
     */
}
