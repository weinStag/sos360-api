import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateLocalizationInput {
  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  emergencyId: string;
}
