/**
 * login.vue的api
 * @author   lvzhiyuan
 * @date     2018/7/6
 */
import request from '@/utils/request';
import qs from 'qs';

const authority = '/authority';
export const loginByUserName = (userInfo) => request.post(`${authority}/oauth/token`, qs.stringify({
  grant_type: 'password',
  username: userInfo.userName,
  password: userInfo.passWord,
  client_id: 'browser',
  client_secret: 'browser'
}));
