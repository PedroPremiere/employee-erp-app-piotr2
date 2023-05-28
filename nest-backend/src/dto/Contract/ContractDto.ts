import { ApiProperty } from '@nestjs/swagger';

export class ContractDto {
    @ApiProperty({
        description: 'ID of item in Database as UUID',
        example: '16fa073d-1d52-40e6-a0d3-0ca5cc75dc55'
    })
    readonly id: string;

    @ApiProperty({
        description: 'Name of position',
        example: 'Bus Driver'
    })
    position: string;

    @ApiProperty({
        description: 'Start date of contract',
        example: '2023-03-26T21:40:36.000Z'
    })
    startDate: Date;

    @ApiProperty({
        description: 'End date of contract',
        example: '2023-03-26T21:40:36.000Z'
    })
    endDate: Date;

    @ApiProperty({
        description: 'User Info (ID)'
    })
    user: {
        id: string;
    };

    @ApiProperty({
        description: 'Number of days per year',
        example: 20
    })
    vacationDaysPerYear: number;

    @ApiProperty({
        description: 'Number of days employee can use',
        example: 10
    })
    vacationDays: number;

    @ApiProperty({
        description: 'Creation date of item',
        example: '2023-03-26T21:40:36.000Z'
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Last update date of item',
        example: '2023-03-26T21:40:36.000Z'
    })
    updatedAt: Date;
}
