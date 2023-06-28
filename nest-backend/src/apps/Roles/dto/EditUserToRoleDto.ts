import { ArrayMaxSize, IsNotEmpty, Validate } from 'class-validator';
import { ArgsType, Field, InputType } from '@nestjs/graphql';

import { ExistingUsersArrayDecorator } from '@/apps/User/validators/existing-users-array-decorator.service';
import { ExistingRolesArrayDecorator } from '@/apps/Roles/validators/existing-roles-array-decorator.service';
import { limits } from '@/project/config/limits';

@InputType()
@ArgsType()
export class EditUserToRoleDto {
    @IsNotEmpty({
        message: 'notEmpty'
    })
    @ArrayMaxSize(limits.maxInputArraySize, {
        message: 'tooManyItems'
    })
    @Validate(ExistingUsersArrayDecorator, {
        message: 'userDoesntExist'
    })
    @Field(type => [String], { nullable: true })
    userIds?: string[];

    @IsNotEmpty({
        message: 'notEmpty'
    })
    @Validate(ExistingRolesArrayDecorator, {
        message: 'roleDoesntExist'
    })
    @ArrayMaxSize(limits.maxInputArraySize, {
        message: 'tooManyItems'
    })
    @Field(type => [String], { nullable: true })
    roleIds?: string[];
}
