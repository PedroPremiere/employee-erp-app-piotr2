import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsStrongPassword,
    MinLength,
    Validate
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ArgsType, Field, InputType } from '@nestjs/graphql';

import { UniqueMailDecorator } from '@/apps/User/validators/unique-mail-decorator.service';

@InputType()
@ArgsType()
export class UpdateUserDto {
    @IsNotEmpty({
        message: 'notEmpty'
    })
    @Field({ nullable: true, description: 'ID of item in Database as UUID' })
    id: string;

    @IsEmail({}, { message: 'notEmailError' })
    @Validate(UniqueMailDecorator, {
        message: 'emailTaken'
    })
    @ApiProperty({
        description: 'User Email',
        example: 'example@example.com'
    })
    @IsOptional()
    @Field({ nullable: true })
    email?: string;
}
