/* 模拟数据 */
import axios from 'axios';
const url = 'https://www.easy-mock.com/mock/5b90e8f12d7a1a353458585e/lzy';
export const getEchartInfo = () => axios.get(`${url}/echartInfo`);

export const getEchartData = (id) => axios.get(`${url}/echartData?id=${id}`);
