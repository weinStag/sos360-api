import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Contact {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  name: string;

  @Field()
  phone: string;

  @Field()
  notify: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
