import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Summary {
  @Field()
  summary: number
  @Field()
  token: string
}
