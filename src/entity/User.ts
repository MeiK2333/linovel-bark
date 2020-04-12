import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nickname?: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  created_at: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sign_at?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  monthly_at?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  last_login?: Date;
}
