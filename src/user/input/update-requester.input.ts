import { Field, InputType } from "@nestjs/graphql";
import { updateUser } from "./update-user.input";

@InputType()
export class updateRequester extends updateUser {
  @Field({ nullable: true })
  phone?: string;
  @Field({ nullable: true })
  address?: string;
}