import { ApiProperty } from '@nestjs/swagger';
import { PageLinkDto } from '@/project/dto/Page/PageLinkDto';

export class PageMetaDto {
    @ApiProperty({
        description: 'Number of items per page',
        example: 25,
        default: 20
    })
    readonly itemsPerPage: number;

    @ApiProperty({
        description: 'Total number of all items in database',
        example: 25000
    })
    readonly totalItems: number;

    @ApiProperty({
        description: 'Current page number',
        example: 2
    })
    readonly currentPage: number;

    @ApiProperty({
        description: 'Total number of pages',
        example: 20
    })
    readonly totalPages: number;

    @ApiProperty({
        description: 'Name of property used for sorting',
        example: 'createdAt'
    })
    readonly sortBy: string[];

    @ApiProperty({
        description: 'Extra links, useful for navigation'
    })
    readonly links: PageLinkDto;
}
