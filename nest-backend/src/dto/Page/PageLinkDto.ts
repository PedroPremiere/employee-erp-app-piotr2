import { ApiProperty } from '@nestjs/swagger';

export class PageLinkDto {
    @ApiProperty({
        description: 'First page of Paginated List',
        example:
            'http://localhost:3000/api/users?page=1&limit=20&sortBy=createdAt:DESC'
    })
    readonly first: string;

    @ApiProperty({
        description: 'Previous page of Paginated List',
        example:
            'http://localhost:3000/api/users?page=1&limit=20&sortBy=createdAt:DESC'
    })
    readonly previous: string;

    @ApiProperty({
        description: 'Current page of Paginated List',
        example:
            'http://localhost:3000/api/users?page=2&limit=20&sortBy=createdAt:DESC'
    })
    readonly current: string;

    @ApiProperty({
        description: 'Next page of Paginated List',
        example:
            'http://localhost:3000/api/users?page=3&limit=20&sortBy=createdAt:DESC'
    })
    readonly next: string;

    @ApiProperty({
        description: 'Last page of Paginated List',
        example:
            'http://localhost:3000/api/users?page=3&limit=20&sortBy=createdAt:DESC'
    })
    readonly last: string;
}
