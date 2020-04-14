import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class BookInfo {
  @Field()
  url: string
  @Field()
  id: number
  @Field()
  title: string
  @Field()
  bookImageLink: string
  @Field()
  author: string
  @Field()
  authorImageLink: string
}
