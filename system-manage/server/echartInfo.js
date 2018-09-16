/**
 * 快捷方式模拟数据
 */
const express = require('express');
const router = express.Router();
// const utility = require('utility');
const model = require('../mock/model');
const echartsInfo = model.getModel('echartsInfo');

/* 获取所有快捷方式 */
router.get('/list', function (req, res) {
  echartsInfo.find({}, function (err, doc) {
    if (!err) {
      res.json({code: 200, data: doc});
    } else {
      res.json({code: 1, msg: '后台出错！'});
    }
  });
});

// 新增快捷方式
router.post('/add', function (req, res) {
  let { title, url, position } = req.body;
  console.log(title);
  console.log(url);
  console.log(position);
  // echartsInfo.create({name: name, path: path, iconUrl: iconUrl}, function (err, doc) {
  //   if (err) res.json({code: 1, msg: err});
  //   console.log(doc);
  //   res.json({code: 200, data: '添加成功！'});
  // });
});

// 删除所有快捷方式
router.delete('/deleteAll', function (req, res) {
  echartsInfo.remove({}, function (err, doc) {
    if (err) res.json({code: 1, msg: err});
    console.log(doc);
    res.json({code: 200, data: '删除成功'});
  });
});

// 删除一个快捷方式
router.delete('/delete', function (req, res) {
  const name = req.query.name;
  echartsInfo.remove({name: name}, function (err, doc) {
    console.log(doc);
    if (err) {
      res.json({code: 404, data: '删除' + name + '失败'});
    }
    res.json({code: 200, data: '删除' + name + '成功'});
  });
});

module.exports = router;
