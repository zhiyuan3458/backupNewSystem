// 删除对象数组，传入参数为已知的对象
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

/**
 * 把url问号后的参数转为对象格式
 * @author   lvzhiyuan
 * @date     2018/9/13
 * @param    url——带参数的访问地址
 * @return   由参数组成的对象
 */
export function param2Obj (url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

/**
 * 把参数转为对象格式
 * @author   lvzhiyuan
 * @date     2018/9/13
 * @param    params——参数(如id=1&name=lvzhiyuan)
 * @return   由参数组成的对象{id: 1, name: lvzhiyuan}
 */
export function param1Obj (params) {
  if (!params) {
    return {};
  }
  return JSON.parse('{"' + decodeURIComponent(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}
