import request from '@/utils/request';
import { getHttp } from '../util';
const baseUrl = '/base';
/**
 * 根据子系统id获取该系统的菜单栏
 * @author lvzhiyuan
 * @date   2018/06/23
 * @param  id——子系统的id
 * @return promise对象——该子系统对应的所有菜单栏
 */

export const getMenus = (id) => getHttp(`${baseUrl}/front/carte/listcarte`, { subsystemId: id });
