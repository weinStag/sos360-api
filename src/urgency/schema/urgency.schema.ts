import { Field, ObjectType } from "@nestjs/graphql";
import { requesterSchema } from 'src/user/schema/requester.schema';
import { attendantSchema } from 'src/user/schema/attendant.schema';
import { Service, Status } from "@prisma/client";


@ObjectType()
export class urgencySchema {
  @Field()
  id: string;

  @Field()
  type: Service;

  @Field({ nullable: true })
  attendant?: attendantSchema;
  
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