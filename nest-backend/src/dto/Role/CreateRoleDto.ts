import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, Validate } from 'class-validator';

import { i18nValidationMessage } from 'nestjs-i18n';

import { User } from '@/entities/User';
import { ExistingUserDecoratos } from '@/decorators/validators/user/ExistingUser.decoratos';
import { IsAfterOrSameDecoratos } from '@/decorators/validators/date/IsAfterOrSame.decoratos';
import { IsBeforeOrSameDecoratos } from '@/decorators/validators/date/IsBeforeOrSame.decoratos';
import { IsNotOverlappingDecoratos } from '@/decorators/validators/contract/IsNotOverlapping.decoratos';

export class CreateRoleDto {
    @IsNotEmpty({
        message: i18nValidationMessage('errors.notEmpty')
    })
    @ApiProperty({
        description: 'Name of Role',
        example: 'Admin'
    })
    name: string;

    @ApiProperty({
        description: 'User IDs'
    })
    @Validate(ExistingUserDecoratos, {
        message: i18nValidationMessage('errors.userDoesntExist')
    })
    users?: User[];
}
