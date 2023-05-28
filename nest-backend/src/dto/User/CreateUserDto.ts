import {
    IsEmail,
    IsNotEmpty,
    IsStrongPassword,
    MinLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

    @IsEmail()
    @ApiProperty({
        description: 'User Email',
        example: 'example@example.com'
    })
    email: string;
}
