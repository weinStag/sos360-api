import { Field, ObjectType } from "@nestjs/graphql";
import { userSchema } from "./user.schema";
import { Service } from "@prisma/client";

@ObjectType()
export class attendantSchema extends userSchema {
  @Field({ description: 'attendant service' })
  service: Service;
}
