import { InputType, Field, Float, PartialType } from '@nestjs/graphql';
import { CreateLocalizationInput } from './create-geoLoc.input';

@InputType()
export class UpdateLocalizationInput extends PartialType(CreateLocalizationInput) {
  @Field()
  id: string;
}
