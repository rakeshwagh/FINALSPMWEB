import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Ingredient {
  @Field()
  grain_id: string;
  @Field()
  proportion: string;
}

@ObjectType()
export class Product {
  @Field({ nullable: true })
  _id?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  price?: number;

  @Field(() => [Ingredient])
  ingredients: Array<Ingredient>;

  @Field({ nullable: true })
  imgUrl: string;
}
