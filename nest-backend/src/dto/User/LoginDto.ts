import {
    IsEmail,
    IsNotEmpty,
    IsStrongPassword,
    MinLength,
    Validate
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UniqueMail } from '@/decorators/validators/user/UniqueMail';

export class LoginDto {
    @IsNotEmpty({
        message: 'password should not be empty'
    })
    @MinLength(6)
    @IsStrongPassword({
        minLength: 6,
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

    @IsEmail()
    @Validate(UniqueMail)
    @ApiProperty({
        description: 'User Email',
        example: 'example@example.com'
    })
    email: string;
}
