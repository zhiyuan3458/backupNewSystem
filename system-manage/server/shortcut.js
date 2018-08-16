/**
 * 快捷方式模拟数据
 */
const express = require('express');
const router = express.Router();
// const utility = require('utility');
const model = require('../mock/model');
const shortcuts = model.getModel('shortcuts');
// const menus = model.getModel('menus');
// const json = [
//   {
//     id: 1,
//     name: '道路养护系统',     // 子系统名称
//     path: '/roadMaintenanceSystem',  // 子系统路径
//     component: 'mainFrame',   // 必须为这个值，直接默认值为它
//     children: [              // 首页信息
//        {
//           // 对应的首页路径，默认值为空即可
//           path: '',
//           // 首页组件
//           component: 'roadMaintenanceSystem/index',
//           // 首页名称
//           name: '道路养护系统首页',
//         },
//         {
//           path: '/standard',
//           name: '规范标准管理',
//           imgUrl: 'standard',
//           // 二级导航栏名称名称
//           componentName: 'roadMaintenanceSystem/standard',
//         },
//         {
//           path: '/basicData',
//           name: '基础数据管理',
//           imgUrl: 'database',
//           componentName: 'roadMaintenanceSystem/basicData'
//         },
//         {
//           path: '/maintenanceService',
//           name: '养护业务管理',
//           imgUrl: 'daily-maintenance',
//           componentName: 'roadMaintenanceSystem/maintenanceService'
//         },
//         {
//           path: '/monitorAndGuard',
//           name: '监测及应急保障',
//           imgUrl: 'safeguard',
//           componentName: 'roadMaintenanceSystem/monitorAndGuard'
//         },
//         {
//           path: '/scienceDecision',
//           name: '科学决策',
//           imgUrl: 'gradmale_avatar',
//           componentName: 'roadMaintenanceSystem/scienceDecision'
//         },
//         {
//           path: '/scienceDecision',
//           name: '综合查询',
//           imgUrl: 'earth_search',
//           componentName: 'roadMaintenanceSystem/scienceDecision',
//         },
//         {
//           path: '/informationSharing',
//           name: '信息共享',
//           imgUrl: 'share_service',
//           componentName: 'roadMaintenanceSystem/informationSharing'
//         },
//         {
//           path: '/systemManage',
//           name: '系统管理',
//           imgUrl: 'tool',
//           componentName: 'roadMaintenanceSystem/systemManage'
//         }
//     ]
// },
//   {
//     id: 2,
//     name: '桥梁监测系统'
//   }
// ];

// projects.remove({}, function (err, doc) {
//   console.log(1234);
// });

// projects.create({
//   name: '道路养护系统',
//   path: '/roadMaintenanceSystem',
//   redirect: '/roadMaintenanceSystem',
//   componentName: 'roadMaintenanceSystem/index',
//   children: [
//     {
//       path: '/',
//       name: '道路养护系统',
//       meta: {
//         title: '道路养护系统'
//       }
//     }
//   ]
// }, function (err, doc) {
//   console.log(1234);
// });

// menus.remove({}, function (err, doc) {
//   console.log(doc);
// });
//
// menus.create({subsystemId: 1, name: '基础数据管理', iconUrl: 'database', children: [{name: '道路养护系统', iconUrl: 'earth_search', path: '/table', componentName: 'roadMaintenanceSystem/table', meta: {title: '区间路段信息'}}, {name: '道路养护系统', iconUrl: 'share_service', path: '/charts/charts', componentName: 'charts/charts', meta: {title: '养护路段信息'}}]}, function (err, doc) {
//   console.log(213);
// });

/* 获取所有快捷方式 */
router.get('/list', function (req, res) {
  shortcuts.find({}, function (err, doc) {
    if (!err) {
      res.json({code: 200, data: doc});
    } else {
      res.json({code: 1, msg: '后台出错！'});
    }
  });
});

// 新增快捷方式
router.post('/add', function (req, res) {
  let { name, path, iconUrl } = req.body;
  console.log(iconUrl)
  shortcuts.create({name: name, path: path, iconUrl: iconUrl}, function (err, doc) {
    if (err) res.json({code: 1, msg: err});
    console.log(doc);
    res.json({code: 200, data: '添加成功！'});
  });
});

// 删除所有快捷方式
router.delete('/deleteAll', function (req, res) {
  shortcuts.remove({}, function (err, doc) {
    if (err) res.json({code: 1, msg: err});
    console.log(doc);
    res.json({code: 200, data: '删除成功'});
  });
});

// 删除一个快捷方式
router.delete('/delete', function (req, res) {
  const name = req.query.name;
  shortcuts.remove({name: name}, function (err, doc) {
    console.log(doc);
    if (err) {
      res.json({code: 404, data: '删除' + name + '失败'});
    }
    res.json({code: 200, data: '删除' + name + '成功'});
  });
});
// 完善boss或者genius信息
// router.post('/update', function (req, res) {
//   const { userid } = req.cookies;
//   if(!userid) {
//     res.json({code: 1});
//   }
//   const body = req.body;
//   Users.findByIdAndUpdate(userid, body, function (err, doc) {
//     if(!err) {
//       const data = Object.assign({},{
//         user: doc.name,
//         type: doc.type
//       }, body);
//       return res.json({code: 0, data});
//     }
//   });
// });

module.exports = router;
