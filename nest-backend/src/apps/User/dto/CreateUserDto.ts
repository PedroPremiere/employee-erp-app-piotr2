import {
    IsEmail,
    IsNotEmpty,
    IsStrongPassword,
    MinLength,
    Validate
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';

import { passwordPolicy } from '@/project/config/passwordPolicy';
import { IsTheSameDecoratos } from '@/project/validators/IsTheSame.decoratos';
import { UniqueMailDecorator } from '@/apps/User/validators/unique-mail-decorator.service';

const { minLength } = passwordPolicy;

export class CreateUserDto {
    @IsNotEmpty({
        message: i18nValidationMessage('errors.notEmpty')
    })
    @MinLength(minLength, {
        message: i18nValidationMessage('errors.tooShort', { minLength })
    })
    @IsStrongPassword(passwordPolicy, {
        message: i18nValidationMessage('errors.tooWeakPasswordError')
    })
    @ApiProperty({
        description: 'User Password',
        example: '$passwordAa1'
    })
    password: string;

    @Validate(IsTheSameDecoratos, ['password'], {
        message: i18nValidationMessage('errors.passwordsTheSame')
    })
    @ApiProperty({
        description: 'User Password',
        example: '$passwordAa1'
    })
    passwordRepeat: string;

    @IsEmail({}, { message: i18nValidationMessage('errors.notEmailError') })
    @Validate(UniqueMailDecorator, {
        message: i18nValidationMessage('errors.emailTaken')
    })
    @ApiProperty({
        description: 'User Email',
        example: 'example@example.com'
    })
    email: string;
}
