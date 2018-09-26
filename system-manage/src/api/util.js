import request from '@/utils/request';
import Qs from 'qs';

const config1 = { 'Content-type': 'application/x-www-form-urlencoded' };
const config2 = { 'Content-Type': 'multipart/form-data' };

const transformRequest = [function (data) {
  let ret = '';
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
  }
  return ret;
}];

/**
 * 把传入的参数变成拼接到url中
 * @author   lvzhiyuan
 * @date     2018/9/21
 * @param    url——API接口
 * @param    params——由参数组成的对象
 */
function joinUrlToParams (url, params) {
  Object.keys(params).forEach((item, index) => {
    if (index === 0) {
      url += `?${item}=${params[item]}`;
    } else {
      url += `&${item}=${params[item]}`;
    }
  });
  return url;
};

/**
 * get方法
 * @author   lvzhiyuan
 * @date     2018/9/21
 * @param    url——API接口
 * @param    params——由参数组成的对象
 */
export const getHttp = (url, params) => {
  url = joinUrlToParams(url, params);
  return request.get(url);
};

/**
 * post方法(适用于Content-Type为application/x-www-form-urlencoded )
 * @author   lvzhiyuan
 * @date     2018/9/21
 * @param    url——API接口
 * @param    params——由参数组成的对象
 */
export const postHttp = (url, params) => {
  return request.post(url, Qs.stringify(params));
};

/**
 * post方法(适用于Content-Type为multipart/form-data,如上传文件时用)
 * @author   lvzhiyuan
 * @date     2018/9/21
 * @param    url——API接口
 * @param    params——由file文件组成的对象
 */
export const postAsFormData = (url, params) => {
  return request.post(url, params, config2);
};

/**
 * put方法
 * @author   lvzhiyuan
 * @date     2018/9/21
 * @param    url——API接口
 * @param    params——由参数组成的对象
 */
export const putHttp = (url, params) => {
  return request.put(url, Qs.stringify(params));
};

/**
 * delete方法
 * @author   lvzhiyuan
 * @date     2018/9/21
 * @param    url——API接口
 * @param    params——由参数组成的对象
 */
export const deleteHttp = (url, params) => {
  url = joinUrlToParams(url, params);
  return request.delete(url);
};
