import { Field, ObjectType } from '@nestjs/graphql';
import { UserDto } from '@/apps/User/dto/UserDto';

@ObjectType({ description: 'contract ' })
export class ContractDto {
    @Field({ description: 'ID of item in Database as UUID' })
    id: string;

    @Field({ description: 'Name of position' })
    position: string;

    @Field({ description: 'Start date of contract' })
    startDate: Date;

    @Field({ description: 'End date of contract' })
    endDate: Date;

    @Field({ description: 'User Id of owner' })
    ownerId: string;

    @Field(type => UserDto, { description: 'User Id of owner' })
    user?: UserDto;

    @Field({ description: 'Number of days per year' })
    vacationDaysPerYear: number;

    @Field({ description: 'Number of days employee can use' })
    vacationDays: number;

    @Field({ description: 'Creation date of item' })
    createdAt: Date;

    @Field({ description: 'Last update date of item' })
    updatedAt: Date;

    static sortable = ['updatedAt', 'createdAt', 'id'];
}
