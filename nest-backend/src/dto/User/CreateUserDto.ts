import {
    IsEmail,
    IsNotEmpty,
    IsStrongPassword,
    MinLength,
    Validate
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsTheSame } from '@/decorators/validators/IsTheSame';
import { UniqueMail } from '@/decorators/validators/user/UniqueMail';

export class CreateUserDto {
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

    @Validate(IsTheSame, ['password'])
    @ApiProperty({
        description: 'User Password',
        example: '$passwordAa1'
    })
    passwordRepeat: string;

    @IsEmail()
    @Validate(UniqueMail)
    @ApiProperty({
        description: 'User Email',
        example: 'example@example.com'
    })
    email: string;
}
