/**
 * login.vue的api
 * @author   lvzhiyuan
 * @date     2018/7/6
 */
import request from '@/utils/request';
import { getHttp } from '../util';

const authority = '/authority';
export const loginByUserName = (userInfo) => request.post(`${authority}/oauth/token?grant_type=password&username=${userInfo.userName}&password=${userInfo.passWord}&client_id=browser&client_secret=browser`);
