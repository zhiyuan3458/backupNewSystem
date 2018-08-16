/**
 * 整合全局less文件
 */
const path = require('path');

const resources = [
  'color.less',
  'theme.less'
];
module.exports = resources.map(resource => path.resolve(__dirname, '../src/common/less', resource));
