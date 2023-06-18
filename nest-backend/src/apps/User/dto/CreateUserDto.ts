import {
    IsEmail,
    IsNotEmpty,
    IsStrongPassword,
    MinLength,
    Validate
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ArgsType, Field, InputType } from '@nestjs/graphql';

import { passwordPolicy } from '@/project/config/passwordPolicy';
import { IsTheSameDecorator } from '@/project/validators/is-the-same-decorator.service';
import { UniqueMailDecorator } from '@/apps/User/validators/unique-mail-decorator.service';

const { minLength } = passwordPolicy;

//todo : formating message like __mf

@InputType()
@ArgsType()
export class CreateUserDto {
    @IsNotEmpty({
        message: 'notEmpty'
    })
    @MinLength(minLength, {
        message: 'tooShort'
    })
    @IsStrongPassword(passwordPolicy, { message: 'tooWeakPasswordError' })
    @Field({ nullable: true })
    password: string;

    @Validate(IsTheSameDecorator, ['password'], {
        message: 'passwordsNotTheSame'
    })
    @ApiProperty({
        description: 'User Password',
        example: '$passwordAa1'
    })
    @Field({ nullable: true })
    passwordRepeat?: string;

    @IsEmail({}, { message: 'notEmailError' })
    @Validate(UniqueMailDecorator, {
        message: 'emailTaken'
    })
    @ApiProperty({
        description: 'User Email',
        example: 'example@example.com'
    })
    @Field({ nullable: true })
    email: string;
}
