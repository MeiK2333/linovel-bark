import { User } from "../entity/user";
import { Summary } from "../entity/summary";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Resolver, Query, FieldResolver, Arg, Root, Mutation, Ctx, Int } from "type-graphql";
import axios from "axios";
import { sleep } from "../utils";

require('dotenv').config();

async function requestService() {
  const service = axios.create();

  service.interceptors.response.use(response => {
    if (response.data.split('|')[0] !== '0') {
      return Promise.reject(new Error(response.data));
    }
    return response.data.split('|');
  })
  return service;
}

@Resolver(of => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  @Query(returns => User, { nullable: true })
  user(@Arg("userId", type => Int) userId: number) {
    return this.userRepository.findOne(userId);
  }

  @Query(returns => [User])
  users(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Query(returns => Summary)
  async summary(): Promise<Summary> {
    const token = process.env.TOKEN;
    const request = await requestService();
    const summaryRes = await request.get(`http://openapi.92jindou.com/api/getSummary?token=${token}`);
    const summary = new Summary();
    summary.summary = Number(summaryRes[1]);
    summary.token = token;
    return summary;
  }
}
