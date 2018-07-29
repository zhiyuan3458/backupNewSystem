/**
 * 创建axios实例
 * @author   lvzhiyuan
 * @date     2018/7/6
 */
import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/vuex';
import { getToken, getRefreshToken, setTokenInCookie, removeToken, getGetTokenTime, setGetTokenTime } from './auth';

const authority = '/authority';
/* 定义一个全局刷新标志 */
window.isRefreshing = false;
/* 定义一个token过期之后发来的请求收集数组 */
let refreshAPI = [];
/**
 * 判断access_token是否过期
 * @author   lvzhiyuan
 * @date     2018/7/26
 * @return   返回Boolean值
 */
function isTokenExpired () {
  const expiredTime = 30 * 1000;
  const getTokenTime = getGetTokenTime();
  return new Date().getTime() - expiredTime > getTokenTime ? true : false;
}

/**
 * 把token过期后的请求截取并放到refreshAPI中缓存
 * @author   lvzhiyuan
 * @date     2018/7/26
 * @param    cb——token过期后被截取的请求
 */
function subscribeTokenRefresh (cb) {
  refreshAPI.push(cb);
}

/**
 * 重新执行token过期后发起的请求
 * @author   lvzhiyuan
 * @date     2018/7/26
 * @param    token——access_token
 * @return   返回token过期后发起的请求
 */
function onRrefreshed (token) {
  refreshAPI.map(cb => cb(token));
  refreshAPI = [];
}

/**
 * access_token过期后通过refresh_token获取新的access_token
 * @author   lvzhiyuan
 * @date     2018/7/26
 * @return   返回Promise对象
 */
function getTokenByRefreshToken () {
  return axios.post(`${authority}/oauth/token?grant_type=refresh_token&client_id=browser&client_secret=browser&refresh_token=${getRefreshToken()}`);
}

/* 创建axios 实例 */
const service = axios.create({
  timeout: 5000,
  isRetryRequest: false
});

/* 请求全局拦截 */
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['CTtoken'] = getToken();
  }
  if (config.url.indexOf('/authority/oauth/token') === -1) {
    if (isTokenExpired()) {
      let retry = new Promise((resolve, reject) => {
        /* (token) => {...}这个函数就是cb */
        subscribeTokenRefresh((token) => {
          config.headers['CTtoken'] = token;
          /* 将请求挂起 */
          resolve(config);
        });
      });
      if (!window.isRefreshing) {
        window.isRefreshing = true;
        getTokenByRefreshToken().then(res => {
          removeToken();
          if (res.status === 200) {
            setGetTokenTime();
            const token = {
              accessToken: res.data.access_token,
              refreshToken: res.data.refresh_token
            };
            console.log(refreshAPI)
            setTokenInCookie(token);
            store.dispatch('setToken', `CTtoken ${res.data.access_token}`);
            onRrefreshed(`CTtoken ${res.data.access_token}`);
          }
        });
      }
      return retry;
    }
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
  response => {
    window.isRefreshing = false;
    return response;
  },
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
