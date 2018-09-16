/* 模拟数据 */
import axios from 'axios';
import { getHttp } from '../../../../api/util';
import Qs from 'qs';

export const getEchartData = (url, id) => getHttp(url, {id});

/**
 * 当图表被resize后保存resize后图表位置与大小
 * @author   lvzhiyuan
 * @date     2018/9/13
 * @api      getEchartsList
 * @method   GET
 * @return   Promise——图表的信息（包括位置，大小，数据的url和标题）
 */
export const resizeChart = (chart) => axios.post('/echarts/resize', Qs.stringify(chart));
