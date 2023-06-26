import { ApiProperty } from '@nestjs/swagger';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { OrderEnum } from '@/project/types/enums/Order.enum';

@InputType()
@ArgsType()
export class PaginationQueryDto {
    @IsInt({
        message: 'mustBeInteger'
    })
    @Field({ nullable: true })
    @Min(0, { message: 'moreThan0' })
    page?: number = 1;

    @ApiProperty({
        description: 'Number of items on page',
        example: 15,
        default: 20,
        required: false
    })
    @IsInt({
        message: 'mustBeInteger'
    })
    @Min(0, { message: 'moreThan0' })
    @Field({ nullable: true })
    perPage?: number = 10;

    @IsOptional()
    @Field({ nullable: true })
    orderBy: string;

    @IsOptional()
    @IsEnum(OrderEnum)
    @Field({ nullable: true })
    orderDirection?: OrderEnum;
}
