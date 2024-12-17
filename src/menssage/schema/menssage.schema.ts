import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class MessageSchema {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field()
  userId: string;

  @Field()
  createdAt: Date;
}

