import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Service, Status } from '@prisma/client';
import { requesterSchema } from 'src/user/schema/requester.schema';
import { attendantSchema } from 'src/user/schema/attendant.schema';

@ObjectType()
export class emergencySchema {
  @Field()
  id: string;

  @Field()
  requester: requesterSchema;

  @Field({ nullable: true })
  attendant?: attendantSchema;

  @Field()
  type: Service;

  @Field()
  description: string;

  @Field()
  status: Status;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  requesterId: string;

  @Field()
  attendantId?: string;
}
