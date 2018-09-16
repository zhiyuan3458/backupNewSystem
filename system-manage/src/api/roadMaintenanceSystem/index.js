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
 * 删除快捷方式
 * @author   lvzhiyuan
 * @date     2018/9/12
 * @api      deleteShortcuts
 * @method   POST
 * @param    carteId
 * @return   ...
 */
export const deleteShortcuts = (carteId) => request.post(`${baseUrl}/front/shortcut/remove`, Qs.stringify({
  carteId
}));

/**
 * 拖拽时把快捷方式存入数据库
 * @author   lvzhiyuan
 * @date     2018/9/12
 * @api      dragDrop
 * @method   POST
 * @param    carteId——子节点的id
 * @return   promise对象——该子系统对应的快捷方式
 */
export const dragDrop = (ids) => request.post(`${baseUrl}/front/shortcut/dragDrop?ids=${ids}`);

/**
 * 获取首页图表的信息（包括位置，大小，数据的url和标题）
 * @author   lvzhiyuan
 * @date     2018/9/13
 * @api      getEchartsList
 * @method   GET
 * @return   Promise——图表的信息（包括位置，大小，数据的url和标题）
 */
export const getEchartsList = (subSystemId) => getHttp('/echarts/list', { subSystemId });
