import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Localization {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  createdAt: Date;

  @Field()
  emergencyId: string;
}
