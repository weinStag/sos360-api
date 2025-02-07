import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContactInput {
  @Field()
  userId: string;

  @Field()
  name: string;

  @Field()
  phone: string;

  @Field({ defaultValue: true })
  notify?: boolean;
}
