/**
 * 创建axios实例
 * @author   lvzhiyuan
 * @date     2018/7/6
 */
import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/vuex';
import { getToken } from './auth';

/* 创建axios 实例 */
const service = axios.create({
  timeout: 5000
});

/* 请求全局拦截 */
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['CTtoken'] = getToken();
  }
  return config;
}, error => {
  console.log('err: ' + error);
  Message({
    message: '请求失败！',
    type: 'error',
    duration: 3 * 1000
  });
  Promise.reject(error);
});

/* 响应全局拦截 */
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err: ' + error);
    Message({
      message: '请求失败！',
      type: 'error',
      duration: 3 * 1000
    });
    return Promise.reject(error);
});

export default service;
