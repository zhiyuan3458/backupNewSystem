/**
 * 常用的表单验证正则规则
 * @author   lvzhiyuan
 * @date     2018/7/8
 */

/* 检测是否为数字类型 */
function validateNumber (num) {
  const reg = /^\d+$/;
  return reg.test(num);
}

/* 检测是否字符串 */
function validateString (str) {
  const reg = /^[\\u4E00-\\u9FA5\\uf900-\\ufa2d\\w\\.\\s]+$/;
  return reg.test(str);
}

/* 检测是否为邮政编码 */
function validatepostCode (postCode) {
  const reg = /^[0-9]{6}$/;
  return reg.test(postCode);
}

/* 检测是否为手机号码 */
function validateMobile (mobile) {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  return reg.test(mobile);
}

/* 检测是否为邮箱格式 */
function validateEmail (email) {
  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return reg.test(email);
}

/* 检测是否为url */
function validateUrl (url) {
  const reg = /^(\w+:\/\/)?\w+(\.\w+)+.*$/;
  return reg.test(url);
}

/* 匹配由26个英文字母组成的字符串 */
function validate26Str (str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/* 匹配国内固定电话号码 */
function validatePhone (phone) {
  const reg = /^(\d{3,4}-)?\d{7,8}$/;
  return reg.test(phone);
}

/* 匹配日期 */
function validateDate (date) {
  const reg = /^[\w\W]*$/;
  return reg.test(date);
}

/* 匹配qq */
function validateQQ (qq) {
  const reg = /^[1-9][0-9]{4,}$/;
  return reg.test(qq);
}

/* 匹配桩号正则：K大写，四个数字+三个数字如：K0012+200 */
function validatePile (pile) {
  const reg = /(^[K]\d{4}\+\d{3}$)/;
  return reg.test(pile);
}

/* 匹配桩号正则：K大写，四个数字+三个数字如：K0012+200 */
function validatePileToPile (pile) {
  const reg = /^[K]\d{4}\+\d{3}[~]([K]\d{4}\+\d{3}$)/;
  return reg.test(pile);
}

export default {
  validateNumber,
  validateString,
  validatepostCode,
  validateMobile,
  validateEmail,
  validateUrl,
  validate26Str,
  validatePhone,
  validateDate,
  validateQQ,
  validatePile,
  validatePileToPile
};
