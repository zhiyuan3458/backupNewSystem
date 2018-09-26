/* 后台管理系统的路由 */
/* 主框，永远不变 */
import MainFrame from '@/pages/mainFrame/mainFrame.vue';
const _import = require('./_import_' + process.env.NODE_ENV);

const index = _import('backStageSystem/index');
const user = _import('backStageSystem/user/index');

export const backStageRouters = [
  {
    path: '/backStageSystem',
    component: MainFrame,
    redirect: '/backStageSystem/index',
    children: [
      {
        path: 'index',
        component: index,
        name: '后台管理系统首页',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'users',
        component: user,
        name: '用户管理',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      }
    ]
  }
];
