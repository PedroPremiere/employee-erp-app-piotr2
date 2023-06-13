import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageMetaDto } from './MetaDto';

export class PageDto<T> {
    @IsArray()
    @ApiProperty({ isArray: true, description: 'List of items' })
    readonly data: T[];

    @ApiProperty({
        type: () => PageMetaDto,
        description: 'Extra data about results ( total number of items etc)'
    })
    readonly meta: PageMetaDto;

    constructor(data: T[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
