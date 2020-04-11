import "reflect-metadata";

import { CronJob } from 'cron';
import { main as register } from './register';
import { main as daily } from './daily';

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
