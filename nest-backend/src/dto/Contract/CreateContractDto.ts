import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, Validate } from 'class-validator';

import { User } from '@/entities/User';
import { ExistingUser } from '@/decorators/validators/user/ExistingUser';
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
    @Validate(ExistingUser)
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
    vacationDays: number;
}
