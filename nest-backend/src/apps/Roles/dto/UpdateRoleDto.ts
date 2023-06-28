import { IsNotEmpty, IsOptional } from 'class-validator';
import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class UpdateRoleDto {
    @IsNotEmpty({
        message: 'notEmpty'
    })
    @Field({ nullable: true, description: 'ID of item in Database as UUID' })
    id: string;

    @IsOptional()
    @Field({ nullable: true })
    name?: string;
}
