import "reflect-metadata";

import { CronJob } from 'cron';
import { main as register } from './register';
import { main as daily } from './daily';
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import * as TypeGraphQL from "type-graphql";
import { UserResolver } from './resolver/user';
import { NicknameResolver } from './resolver/nickname';
import { connect } from './connect';

// 每小时尝试注册一次
const registerJob = new CronJob('0 * * * *', async function () {
  await register();
}, null, true, 'Asia/Shanghai');

// 每天签到
const dailyJob = new CronJob('0 0 * * *', async function () {
  await daily();
}, null, true, 'Asia/Shanghai');

registerJob.start();
dailyJob.start();

TypeORM.useContainer(Container);

async function bootstrap() {
  await connect();
  const schema = await TypeGraphQL.buildSchema({
    resolvers: [UserResolver, NicknameResolver],
    container: Container,
  });
  const server = new ApolloServer({ schema });
  const { url } = await server.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
