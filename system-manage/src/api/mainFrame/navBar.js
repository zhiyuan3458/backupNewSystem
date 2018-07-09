/* 获取子系统的相关信息 */
import { getHttp } from '../util';
const baseUrl = '/base';
/**
 * 根据编码取得分页的信息列表.
 * @author
 * @date
 * @param
 * @param
 * @param
 * @return
 */
export const getSubSystemInfo = () => getHttp('/base/front/subsystem', '');
