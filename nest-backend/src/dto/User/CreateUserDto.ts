import {
    IsEmail,
    IsNotEmpty,
    IsStrongPassword,
    MinLength
} from 'class-validator';

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
    password: string;

    @IsEmail()
    email: string;
}
