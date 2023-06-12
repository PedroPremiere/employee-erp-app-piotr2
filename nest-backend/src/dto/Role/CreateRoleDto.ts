import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, Validate } from 'class-validator';

import { i18nValidationMessage } from 'nestjs-i18n';

import { User } from '@/entities/User';
import { ExistingUserDecorator } from '@/decorators/validators/user/existing-user-decorator.service';
import { IsAfterOrSameDecoratos } from '@/decorators/validators/date/IsAfterOrSame.decoratos';
import { IsBeforeOrSameDecoratos } from '@/decorators/validators/date/IsBeforeOrSame.decoratos';
import { IsNotOverlappingDecorator } from '@/decorators/validators/contract/is-not-overlapping-decorator.service';
import { ExistingUsersDecorator } from '@/decorators/validators/user/existing-users-decorator.service';

export class CreateRoleDto {
    @IsNotEmpty({
        message: i18nValidationMessage('errors.notEmpty')
    })
    @ApiProperty({
        description: 'Name of Role',
        example: 'Admin'
    })
    name: string;
}
