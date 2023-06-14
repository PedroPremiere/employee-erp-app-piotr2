import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Message after delete item' })
export class DeleteMessage {
    @Field({ description: 'message text' })
    message: string;
}
