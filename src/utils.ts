import { User } from 'linovel';
import { connect } from './connect';
import { User as UserEntity } from './entity/User';

export async function loginUser(username: string, password: string) {
  const connection = await connect();
  const user = await connection
    .getRepository(UserEntity)
    .createQueryBuilder('user')
    .where(`user.username = ${username}`)
    .getOne();
  let result: User = null;
  result = new User(username);
  if (user && user.token) {
    result.token = user.token;
    try {
      // 尝试获取个人信息，验证 token 是否还有效
      await result.info();
    } catch {
      await result.login(username, password);
    }
  } else {
    await result.login(username, password);
  }
  if (user) {
    user.last_login = new Date();
    user.token = result.token;
    user.nickname = result.nick;
    await connection.manager.save(user);
  }
  return result;
}

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function between(min: number, max: number) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}
