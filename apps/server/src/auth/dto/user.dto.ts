import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDto {
  @Field({ nullable: true })
  name: string;

  @Field()
  email: string;

  @Field()
  uid: string;

  @Field()
  email_verified: boolean;

  @Field({ nullable: true })
  phone_number?: string;
}
