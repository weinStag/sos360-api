import { Field, ObjectType } from '@nestjs/graphql';
import { userSchema } from './user.schema';

@ObjectType()
export class LoginResponse {
  @Field(() => userSchema)
  user: userSchema;

  @Field()
  token: string;
}
