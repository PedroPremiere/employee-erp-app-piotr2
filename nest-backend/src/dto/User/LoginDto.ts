import {
    IsEmail,
    IsNotEmpty,
    IsStrongPassword,
    MinLength,
    Validate
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { conf } from '@/config';
import { UniqueMail } from '@/decorators/validators/user/UniqueMail';
import { i18nValidationMessage } from 'nestjs-i18n';

const minPasswordLen = conf.security.minPasswordLen;

export class LoginDto {
    @IsNotEmpty({
        message: i18nValidationMessage('errors.notEmpty')
    })
    @MinLength(minPasswordLen, {
        message: i18nValidationMessage('errors.tooShort', { minPasswordLen })
    })
    @IsStrongPassword({
        minLength: minPasswordLen,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    @ApiProperty({
        description: 'User Password',
        example: '$passwordAa1'
    })
    password: string;

    @IsEmail({}, { message: i18nValidationMessage('errors.notEmailError') })
    @ApiProperty({
        description: 'User Email',
        example: 'example@example.com'
    })
    email: string;
}
