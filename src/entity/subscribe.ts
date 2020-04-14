import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Subscribe {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  // 要订阅的书籍的 id
  @Field()
  @Column()
  targetId: number;

  @Field()
  @Column()
  title: string;
}
