/**
 * 判断obj是否是一个对象
 * @author   lvzhiyuan
 * @date     2018/9/21
 * @param    obj
 * @return   返回obj所属的类型
 */
function getType (obj) {
  // tostring会返回对应不同的标签的构造函数
  let toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
}

/**
 * 数组与对象的深度克隆
 * @author   lvzhiyuan
 * @date     2018/9/21
 * @param    data——数组或对象
 * @return   返回新的数组和对象
 */
export function deepClone (data) {
  var type = getType(data);
  var obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    // 不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
}

/**
 * 给某个html元素加class
 * @author   lvzhiyuan
 * @date     2018/9/21
 * @param    el——元素标签
 * @param    className——要加的class名
 * @return
 */
export function addClass (el, className) {
  if (hasClass(el, className)) {
    return false;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

/**
 * 判断某个html元素是否有某个class
 * @author   lvzhiyuan
 * @date     2018/9/21
 * @param    el——元素标签
 * @param    className——要加的class名
 * @return   Boolean值——true 或 false
 */
export function hasClass (el, className) {
  let reg = new RegExp(`(^|\\s${className}(\\s|$))`);
  return reg.test(el.className);
}
