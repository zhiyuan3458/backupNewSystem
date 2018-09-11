/* mainFrame/header API */
import request from '@/utils/request';
import Qs from 'qs';

const authority = '/authority';
const base = '/base';
/**
 * 登出功能
 * @author   lvzhiyuan
 * @date     2018/8/22
 * @param    token——现在的token
 * @return   Promise对象
 */
export const logout = (token) => request.delete(`${authority}/user/logout`);

/**
 * 点击保存按钮保存图表顺序
 * @author   lvzhiyuan
 * @date     2018/8/22
 * @param    ids——带有id的数组
 * @return   Promise对象
 */
export const saveDeskSetting = (ids) => request.post(`${base}/front/layout/saveOrUpdate`, Qs.stringify({
  ids
}));

/**
 * 点击setting键获取图表现在的表名和规格
 * @author   lvzhiyuan
 * @date     2018/8/27
 * @param    layoutId——表名的id
 * @return   Promise对象
 */
export const getChartInfo = (layoutId) => request.get(`${base}/front/layoutmodel/getLayoutModel?layoutId=${layoutId}`);

/**
 * 点击保存按钮保存表名与规格
 * @author   lvzhiyuan
 * @date     2018/8/27
 * @param    ids——带有id的数组
 * @return   Promise对象
 */
export const saveChartInfo = ({ layoutId, title, model }) => request.post(`${base}/front/layoutmodel/saveOrUpdate`, Qs.stringify({
  layoutId,
  title,
  model
}));
