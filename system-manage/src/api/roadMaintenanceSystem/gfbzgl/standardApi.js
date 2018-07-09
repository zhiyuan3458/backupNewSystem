import request from '@/utils/request';
import { getHttp } from '../../util';

const baseUrl = '/base';

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
 * 获取列表左边伸缩导航栏的zTree树形
 * @author   lvzhiyuan
 * @date     2018/6/1
 * @return   返回列表左边伸缩导航栏的zTree树形
 */
export const getTree = () => request.post(`${baseUrl}/front/legal/getTree`);
/**
 * 根据包含了dictionaryId，pageNum，pageSize的obj获取列表信息
 * @author lvzhiyuan
 * @api    getRoadData
 * @date   2018/06/01
 * @param  obj——包括了dictionaryId，pageNum，pageSize三个属性
 * @return promise对象，用then(res => {})解析promise并输出res
 */
export const getListJson =
  (roadData) => getHttp(`${baseUrl}/front/legal/listJson`, roadData);

// 删除法律列表
export const remove = (ids) => {
  request.defaults.transformRequest = transformRequest;
  return request({
    method: 'post',
    url: `${baseUrl}/front/legal/remove`,
    headers: config1,
    data: {
      ids: ids
    }
  });
};

/**
 *
 * @author   lvzhiyuan
 * @date     2018/6/1
 * @param    id——当前查看的行的id
 * @return   promise对象，包含了当前行的所有信息
 */
export const addEdit = (id) => getHttp(`${baseUrl}/front/legal/addEdit`, {id});
/**
 *
 * @author   lvzhiyuan
 * @date     2018/6/1
 * @param    files——将要上传的文件
 * @return   promise对象，包含了当前上传了的文件的所有信息
 */
export const upload = (files) => request.post('/upload/sys/attachment/upload', files, config2);

/**
 *
 * @author   lvzhiyuan
 * @date     2018/6/1
 * @param    form——封装了要传到后台的表单的对象
 * @return   promise对象
 */
export const saveOrUpdate = (form) => {
  request.defaults.transformRequest = transformRequest;
  return request({
    method: 'post',
    url: `${baseUrl}/front/legal/saveOrUpdate`,
    headers: config1,
    data: form,
    transformRequest: transformRequest
  });
};

export const deleteFile = (id) => request.delete(`/upload/sys/attachment/delete?id=${id}`);
