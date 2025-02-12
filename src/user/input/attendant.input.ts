import { Field, InputType } from "@nestjs/graphql";
import { userInput } from "./user.input";
import { Service } from "@prisma/client";

@InputType()
export class attendantInput extends userInput {
  @Field({ description: 'user service' })
  service: Service;
}
