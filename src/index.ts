import "reflect-metadata";

import { CronJob } from 'cron';
import { main as register } from './register';

(async () => {
  
})();

// 每小时尝试注册一次
// const registerJob = new CronJob('0 * * * *', async function () {
//   await register();
// }, null, true, 'Asia/Shanghai');
// registerJob.start();
