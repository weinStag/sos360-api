import { InputType, Field } from '@nestjs/graphql';
import { Service, Status } from '@prisma/client';

@InputType()
export class urgencyInput {
  @Field()
  id?: string;

  @Field({ nullable: true })
  attendantId?: string;

  @Field(() => Service)
  type: Service;

  @Field()
  description: string;

  @Field(() => Status, { defaultValue: Status.CREATED })
  status: Status;
}

