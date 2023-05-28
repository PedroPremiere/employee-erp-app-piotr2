import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({
        description: 'ID of item in Database as UUID',
        example: '16fa073d-1d52-40e6-a0d3-0ca5cc75dc55'
    })
    readonly id: string;

    @ApiProperty({
        description: 'User Email',
        example: 'example@example.com'
    })
    email: string;

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
