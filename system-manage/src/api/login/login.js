/**
 * login.vue的api
 * @author   lvzhiyuan
 * @date     2018/7/6
 */
import request from '@/utils/request';
import { getHttp } from '../util';

const base = '/base';
export const loginByUserName = (userInfo) => {
  console.log(`${base}/oauth/token?grant_type=password&username=${userInfo.userName}&password=${userInfo.passWord}&client_id=browser&client_secret=browser`)
  return request.post(`${base}/oauth/token?grant_type=password&username=${userInfo.userName}&password=${userInfo.passWord}&client_id=browser&client_secret=browser`)};

// export const loginByUserName = (userInfo) => axios({
//   url: `${base}/oauth/token?grant_type=password&username=${userInfo.userName}&password=${userInfo.passWord}&client_id=browser&client_secret=browser`,
//   method: 'post'
// });
