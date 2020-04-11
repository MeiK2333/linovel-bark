import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  nickname: string;

  @Column()
  password: string;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  sign_at: Date;

  @Column({ nullable: true })
  monthly_at: Date;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  last_login: Date;
}
