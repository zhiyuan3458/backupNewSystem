// import request from '@/utils/request';
import { getHttp } from '../util';

const baseUrl = '/base';

/**
 *
 * @author   lvzhiyuan
 * @date     2018/9/18
 * @api      getUserList
 * @method   GET
 * @param    deptId——部门id
 * @param    pageNum——第几页
 * @param    pageSize——每页显示多少条信息
 * @return   Promise对象——含有用户信息的Promise的对象
 */
export const getUserList = ({deptId, pageNum, pageSize}) => getHttp(`${baseUrl}/sys/user/listJson`, {deptId, pageNum, pageSize});

/**
 *
 * @author   lvzhiyuan
 * @date     2018/9/18
 * @api      saveOrUpdate
 * @method   GET
 * @param    deptId——部门id
 * @param    pageNum——第几页
 * @param    pageSize——每页显示多少条
 * @return   返回一个包含用户
 */
export const saveOrUpdate = ({deptId, pageNum, pageSize}) => getHttp(`${baseUrl}/sys/user/listJson`, {deptId, pageNum, pageSize});
