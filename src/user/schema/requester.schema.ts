import { Field, ObjectType } from "@nestjs/graphql";
import { userSchema } from "./user.schema";

@ObjectType()
export class requesterSchema extends userSchema {
  @Field({ description: 'requester cpf' })
  cpf: String;

  @Field({ description: 'requester phone' })
  phone: String;

  @Field({ description: 'requester address' })
  address: String;
}
