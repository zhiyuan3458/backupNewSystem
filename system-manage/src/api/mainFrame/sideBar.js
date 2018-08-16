import request from '@/utils/request';
import { getHttp } from '../util';
import Qs from 'qs';
const baseUrl = '/base';
/**
 * 根据子系统id获取该系统的菜单栏
 * @author lvzhiyuan
 * @date   2018/06/23
 * @param  id——子系统的id
 * @return promise对象——该子系统对应的所有菜单栏
 */

export const getMenus = (id) => getHttp(`${baseUrl}/front/carte/listcarte`, { subsystemId: id });

/**
 * 新增快捷方式
 * @author lvzhiyuan
 * @date   2018/08/08
 * @param  name——快捷方式的name
 * @param  path——快捷方式的path
 * @param  icon——快捷方式的icon
 * @return promise对象—— 返回添加成功
 */
export const addShortcut = (carteId) => request.post(`${baseUrl}/front/shortcut/saveOrUpdate`, Qs.stringify({
  carteId
}));
