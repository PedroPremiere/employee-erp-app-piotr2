import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
    @ApiProperty({
        description: 'Page Number',
        example: 2,
        default: 1,
        required: false
    })
    page: number;

    @ApiProperty({
        description: 'Number of items on page',
        example: 15,
        default: 20,
        required: false
    })
    limit: number;

    @ApiProperty({
        description: 'Name of property used for sorting',
        example: 'createdAt',
        required: false
    })
    sortBy: string;

    @ApiProperty({
        description: 'Searched Keyword',
        example: 'John',
        required: false
    })
    search: string;

    @ApiProperty({
        description: 'Keyword used for filtering. Use like filter.property=',
        example: 'filter.age=$gte:3',
        required: false
    })
    filter: string;

    @ApiProperty({
        description: 'Optionally you can list properties you want to select',
        example: 'id,name,color,age',
        required: false
    })
    select: string;
}
