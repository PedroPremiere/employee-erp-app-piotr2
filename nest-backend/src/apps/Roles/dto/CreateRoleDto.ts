import { IsNotEmpty } from 'class-validator';
import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class CreateRoleDto {
    @IsNotEmpty({
        message: 'notEmpty'
    })
    @Field({ nullable: true })
    name: string;
}
