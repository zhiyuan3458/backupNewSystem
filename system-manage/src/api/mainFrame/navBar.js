/* 获取子系统的相关信息 */
import request from '@/utils/request';
import Qs from 'qs';
import { getHttp } from '../util';
const baseUrl = '/base';
/**
 *
 * @author   lvzhiyuan
 * @date     2018/9/12
 * @api      getSubSystemInfo
 * @method   GET
 * @return   子系统信息
 */
export const getSubSystemInfo = () => getHttp(`${baseUrl}/front/subsystem`, '');

/**
 * 获取所有的快捷方式信息
 * @author   lvzhiyuan
 * @date     2018/9/12
 * @api      getShortcutsList
 * @method   GET
 * @param    subsystemId——子系统的id
 * @return   promise对象——该子系统对应的快捷方式
 */
export const getShortcutsList = (subsystemId) => getHttp(`${baseUrl}/front/shortcut/listPersonalShortcut`, {subsystemId});

/**
 * 获取所有的快捷方式信息
 * @author lvzhiyuan
 * @date   2018/08/12
 * @api    deleteShortcuts
 * @param  carteId——子节点的id
 * @return promise对象——该子系统对应的快捷方式
 */
export const deleteShortcuts = (carteId) => request.post(`${baseUrl}/front/shortcut/remove`, Qs.stringify({
  carteId
}));

/**
 * 拖拽时把快捷方式存入数据库
 * @author lvzhiyuan
 * @date   2018/08/12
 * @api    dragDrop
 * @param  carteId——子节点的id
 * @return promise对象——该子系统对应的快捷方式
 */
export const dragDrop = (ids) => request.post(`${baseUrl}/front/shortcut/dragDrop?ids=${ids}`);
