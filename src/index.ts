import { CronJob } from 'cron';
import { main as register } from './register';

const registerJob = new CronJob('0 * * * *', async function () {
  await register();
}, null, true, 'Asia/Shanghai');
registerJob.start();
