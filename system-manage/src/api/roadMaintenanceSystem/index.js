/**
 * src/pages/roadMaintenanceSystem/index.vue的api
 * @author   lvzhiyuan
 * @date     2018/7/6
 */
import request from '@/utils/request';
import Qs from 'qs';
import {getHttp} from '../util';

const baseUrl = '/base';
/**
 * 获取所有的快捷方式信息
 * @author lvzhiyuan
 * @date   2018/08/12
 * @param  subsystemId——子系统的id
 * @return promise对象——该子系统对应的快捷方式
 */
export const getShortcutsList = (subsystemId) => getHttp(`${baseUrl}/front/shortcut/listPersonalShortcut`, {subsystemId});

/**
 * 获取所有的快捷方式信息
 * @author lvzhiyuan
 * @date   2018/08/12
 * @param  carteId——子节点的id
 * @return promise对象——该子系统对应的快捷方式
 */
export const deleteShortcuts = (carteId) => request.post(`${baseUrl}/front/shortcut/remove`, Qs.stringify({
  carteId
}));
