import { Field, InputType } from "@nestjs/graphql";
import { userInput } from "./user.input";

@InputType()
export class requesterInput extends userInput {
  @Field({ description: 'user cpf' })
  cpf: string;

  @Field({ description: 'user phone' })
  phone: string;

  @Field({ description: 'user address' })
  address: string;
}
