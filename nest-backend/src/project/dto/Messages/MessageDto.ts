import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Message' })
export class MessageDto {
    @Field({ description: 'message text' })
    message: string;
}
