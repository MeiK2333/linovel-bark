import { Nickname } from "../entity/nickname";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Resolver, Query, FieldResolver, Arg, Root, Mutation, Ctx, Int } from "type-graphql";

@Resolver(of => Nickname)
export class NicknameResolver {
  constructor(
    @InjectRepository(Nickname) private readonly nicknameRepository: Repository<Nickname>,
  ) {}

  @Query(returns => Nickname, { nullable: true })
  nickname(@Arg("nicknameId", type => Int) nicknameId: number) {
    return this.nicknameRepository.findOne(nicknameId);
  }

  @Query(returns => [Nickname])
  nicknames(): Promise<Nickname[]> {
    return this.nicknameRepository.find();
  }

  @Mutation(returns => Nickname)
  async addNickname(
    @Arg("nickname") nickname: string
  ): Promise<Nickname> {
    const nick = this.nicknameRepository.create({
      nickname: nickname,
      used: false
    });
    return await this.nicknameRepository.save(nick);
  }
}
