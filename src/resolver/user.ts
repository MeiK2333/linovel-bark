import { User } from "../entity/user";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Resolver, Query, FieldResolver, Arg, Root, Mutation, Ctx, Int } from "type-graphql";

@Resolver(of => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Query(returns => User, { nullable: true })
  user(@Arg("userId", type => Int) userId: number) {
    return this.userRepository.findOne(userId);
  }

  @Query(returns => [User])
  users(): Promise<User[]> {
    return this.userRepository.find();
  }
}
