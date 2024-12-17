import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class MessageInput {
  @Field()
  content: string;

  @Field()
  userId: string;
}
