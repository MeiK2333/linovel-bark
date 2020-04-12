#!/usr/local/bin/ts-node
import axios from 'axios';
import { User, Book } from 'linovel';
import { connect } from './connect';
import { User as UserEntity } from './entity/user';

require('dotenv').config();

export async function main() {
  const { username, password, info, token } = await register();
  console.log(username, password);
  const connection = await connect();
  const user = new UserEntity();
  user.username = username;
  user.password = password;
  user.created_at = new Date();
  user.sign_at = new Date();
  user.monthly_at = new Date();
  user.last_login = new Date();
  user.nickname = info['nick'];
  user.token = token;
  await connection.manager.save(user);
}

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

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getCode(objId: string, phone: string) {
  const token = process.env.TOKEN;
  const request = await requestService();
  let code = null;
  await sleep(1000);
  // 获取当前的号码
  await request.get(`http://openapi.92jindou.com/api/specified?sid=${objId}&phone=${phone}&token=${token}`);
  // 循环等待验证码，最多尝试十次
  for (let i = 0; i < 10; i++) {
    // console.log(`${phone} 尝试获取验证码`);
    await sleep(6000);
    const codeRes = await axios.get(`http://openapi.92jindou.com/api/getMessage?sid=${objId}&phone=${phone}&token=${token}`);
    if (codeRes.data.startsWith('0|')) {
      code = codeRes.data.split('|')[2];
      console.log(`${phone} 获取验证码成功：${code}`);
      break;
    }
    // console.log(`${phone} 未获取到验证码`)
  }
  // 如果没能获取到验证码
  if (code === null) {
    console.log(`释放手机号：${phone}`);
    await request.get(`http://openapi.92jindou.com/api/cancelRecv?sid=${objId}&phone=${phone}&token=${token}`);
    throw new Error('获取验证码失败');
  }
  return code;
}

async function register() {
  const token = process.env.TOKEN;
  const request = await requestService();
  // 检查余额
  const summaryRes = await request.get(`http://openapi.92jindou.com/api/getSummary?token=${token}`);
  const summary = Number(summaryRes[1]);
  console.log(`余额：${summary}`);
  if (summary < 1) {
    throw new Error('余额不足，请充值');
  }
  // 获取手机号
  const objId = '11672';
  const phoneResp = await request.get(`http://openapi.92jindou.com/api/getPhone?sid=${objId}&token=${token}`);
  const phone = phoneResp[1];
  const username = phone;
  const password =  phone;
  console.log(`获取到手机号：${phone}`);
  // 释放手机号，需要获取验证码的时候再进行锁定
  await request.get(`http://openapi.92jindou.com/api/cancelRecv?sid=${objId}&phone=${phone}&token=${token}`);

  // 注册账号
  const user = new User(phone);
  // 发送请求
  await user.sendLoginPhoneMsg();
  console.log(`${phone} 发送注册请求`);
  let code = await getCode(objId, phone);
  // 使用验证码注册
  await user.loginByPhoneMsg(code);
  console.log(`${phone} 注册成功`);
  // 注册后过一分钟再修改密码
  await sleep(60000);

  // 修改密码
  // 发送重置密码请求
  console.log(`${phone} 发送重置密码请求`);
  await user.sendForgetPwdPhoneMsg();
  code = await getCode(objId, phone);
  await user.resetPasswordByPhone(code, password);
  console.log(`${phone} 重置密码成功`);

  // 修改用户名
  // await user.rename(phone);
  await sleep(1000);
  await user.sign();
  await user.monthly();
  console.log(`${phone} 每日签到 && 领取月票成功`);

  const info = await user.info();

  // 收藏指定的书籍
  // await sleep(5000);
  // const favorite = Number(process.env.FAVORITE);
  // const book = new Book(favorite);
  // await book.info();
  // await book.favorite(user);
  // console.log(`《${book.name}》收藏成功`);

  return { username, password, info, token: user.token };
}
