import { Subscribe } from "../entity/subscribe";
import { BookInfo } from "../entity/bookInfo";
import { Repository } from "typeorm";
import axios from "axios";
import { parse } from 'node-html-parser';
import { InjectRepository } from "typeorm-typedi-extensions";
import { Resolver, Query, FieldResolver, Arg, Root, Mutation, Ctx, Int } from "type-graphql";

@Resolver(of => Subscribe)
export class SubscribeResolver {
  constructor(
    @InjectRepository(Subscribe) private readonly subscribeRepository: Repository<Subscribe>,
  ) {}

  @Query(returns => Subscribe)
  subscribe(@Arg("subscribeId", type => Int) subscribeId: number) {
    return this.subscribeRepository.findOne(subscribeId);
  }

  @Query(returns => [Subscribe])
  subscribes(): Promise<Subscribe[]> {
    return this.subscribeRepository.find();
  }

  @Mutation(returns => Subscribe)
  async addSubscribe(
    @Arg("targetId") targetId: number,
    @Arg("title") title: string
  ): Promise<Subscribe> {
    const sub = this.subscribeRepository.create({
      targetId,
      title
    });
    return await this.subscribeRepository.save(sub);
  }

  @Query(returns => BookInfo)
  async bookInfo(@Arg("url") url: string): Promise<BookInfo> {
    const bi = new BookInfo();
    const resp = await axios.get(url);
    const root = parse(resp.data);
    bi.url = url;
    //@ts-ignore
    bi.bookImageLink = root.querySelector('.book-cover').querySelector('a').getAttribute('href').split('!')[0];
    bi.id = Number(url.split('/')[4].split('.')[0]);
    //@ts-ignore
    bi.title = root.querySelector('.book-title').getAttribute('title');
    //@ts-ignore
    const author_frame = root.querySelector('.author-frame');
    bi.author = author_frame.querySelector('a').rawText;
    bi.authorImageLink = author_frame.querySelector('img').getAttribute('src').split('!')[0];
    return bi;
  }
}
