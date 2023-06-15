import { Field, ObjectType } from '@nestjs/graphql';
import { UserDto } from '@/apps/User/dto/UserDto';

@ObjectType({ description: 'Role ' })
export class RoleDto {
    @Field({ description: 'ID of item in Database as UUID' })
    id: string;

    @Field({ description: 'Name of item' })
    name: string;

    @Field({ description: 'Creation date of item' })
    createdAt: Date;

    @Field({ description: 'Last update date of item' })
    updatedAt: Date;

    @Field(type => [UserDto], { description: 'User Ids of owners' })
    users?: [UserDto];
}
