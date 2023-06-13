import { Field, ObjectType } from '@nestjs/graphql';
import { ContractDto } from '@/apps/Contracts/dto/ContractDto';

@ObjectType({ description: 'user ' })
export class UserDto {
    @Field({ description: 'ID of item in Database as UUID' })
    id: string;

    @Field({ description: 'User Email' })
    email: string;

    @Field(type => [ContractDto], {
        description: 'User Contracts',
        nullable: true
    })
    contracts?: [ContractDto];

    @Field({ description: 'Creation date of item' })
    createdAt: Date;

    @Field({ description: 'Last update date of item' })
    updatedAt: Date;
}
