import {
    IsEmail,
    IsNotEmpty,
    IsStrongPassword,
    MinLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { passwordPolicy } from '@/project/config/passwordPolicy';

const { minLength } = passwordPolicy;

export class LoginDto {
    @IsNotEmpty({
        message: "i18nValidationMessage('errors.notEmpty')"
    })
    @MinLength(minLength, {
        message: "i18nValidationMessage('errors.tooShort', { minLength })"
    })
    @IsStrongPassword(passwordPolicy)
    @ApiProperty({
        description: 'User Password',
        example: '$passwordAa1'
    })
    password: string;

    @IsEmail({}, { message: "i18nValidationMessage('errors.notEmailError')" })
    @ApiProperty({
        description: 'User Email',
        example: 'example@example.com'
    })
    email: string;
}
