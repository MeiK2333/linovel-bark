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
  createdAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  signAt?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  monthlyAt?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastLogin?: Date;
}

export type UserType = User
