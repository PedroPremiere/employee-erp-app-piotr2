import {
    IsEmail,
    IsNotEmpty,
    IsStrongPassword,
    MinLength,
    Validate
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';

import { conf } from '@/config';
import { IsTheSame } from '@/decorators/validators/IsTheSame';
import { UniqueMail } from '@/decorators/validators/user/UniqueMail';

const minPasswordLen = conf.security.minPasswordLen;

export class CreateUserDto {
    @IsNotEmpty({
        message: i18nValidationMessage('errors.notEmpty')
    })
    @MinLength(minPasswordLen, {
        message: i18nValidationMessage('errors.tooShort', { minPasswordLen })
    })
    @IsStrongPassword(
        {
            minLength: minPasswordLen,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        },
        { message: i18nValidationMessage('errors.tooWeakPasswordError') }
    )
    @ApiProperty({
        description: 'User Password',
        example: '$passwordAa1'
    })
    password: string;

    @Validate(IsTheSame, ['password'], {
        message: i18nValidationMessage('errors.passwordsTheSame')
    })
    @ApiProperty({
        description: 'User Password',
        example: '$passwordAa1'
    })
    passwordRepeat: string;

    @IsEmail({}, { message: i18nValidationMessage('errors.notEmailError') })
    @Validate(UniqueMail, {
        message: i18nValidationMessage('errors.emailTaken')
    })
    @ApiProperty({
        description: 'User Email',
        example: 'example@example.com'
    })
    email: string;
}
