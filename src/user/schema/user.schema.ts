import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class userSchema {
  @Field({ description: 'user ID' })
  id?: string;

  @Field({ description: 'user name' })
  name: string;

  @Field({ description: 'user email' })
  email: string;

  @Field({ description: 'user rg' })
  rg: string;

  @Field({ description: 'user address' })
  address: string;

  @Field({ description: 'user phone' })
  phone: string;

  @Field({ description: 'user active' })
  active: boolean;

  @Field({ description: 'user password' })
  password: string;
}
