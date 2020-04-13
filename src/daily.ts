import { loginUser, sleep, between } from './utils';
import { connect } from './connect';
import { User as UserEntity } from './entity/user';

export async function main() {
  const connection = await connect();
  const users = await connection.getRepository(UserEntity).createQueryBuilder('user').getMany();
  const tasks = [];
  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    tasks.push(dailyOne(u));
  }
  await Promise.all(tasks);
}

async function dailyOne(u: UserEntity) {
  // 随机延迟 0 - 1 小时，不要在同一时间签到
  const delay = between(0, 60 * 60 * 1000);
  await sleep(delay);
  const connection = await connect();
  try {
    const user = await loginUser(u.username, u.password);
    await user.sign();
    console.log(`${u.username} 每日签到成功`);
    u.signAt = new Date();
    connection.manager.save(u);
  } catch {
    console.log(`${u.username} 每日签到失败`);
  }
}
