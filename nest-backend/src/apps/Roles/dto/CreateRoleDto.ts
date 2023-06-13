import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, Validate } from 'class-validator';

import { i18nValidationMessage } from 'nestjs-i18n';

import { User } from '@/apps/User/entities/User';
import { ExistingUserDecorator } from '@/apps/User/validators/existing-user-decorator.service';
import { IsAfterOrSameDecoratos } from '@/project/validators/date/IsAfterOrSame.decoratos';
import { IsBeforeOrSameDecoratos } from '@/project/validators/date/IsBeforeOrSame.decoratos';
import { IsNotOverlappingDecorator } from '@/project/validators/contract/is-not-overlapping-decorator.service';
import { ExistingUsersDecorator } from '@/apps/User/validators/existing-users-decorator.service';

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
