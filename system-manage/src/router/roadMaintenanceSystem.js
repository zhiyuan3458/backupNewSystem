// /* 道路养护系统的路由 */
import MainFrame from '@/pages/mainFrame/mainFrame.vue';
// /* 主框，永远不变 */
const _import = require('./_import_' + process.env.NODE_ENV);
const index = _import('roadMaintenanceSystem/index');
const list = _import('roadMaintenanceSystem/lzyTableWrapper/lzyTableWrapper');
const formBarTable = _import('roadMaintenanceSystem/formBarTable/formBarTable');

export const roadMaintenanceSystemRouter = [
  {
    path: '/roadMaintenanceSystem',
    component: MainFrame,
    redirect: '/roadMaintenanceSystem/index',
    children: [
      {
        path: 'index',
        name: '道路养护系统首页',
        component: index,
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'standard/law',
        name: '法律法规',
        component: list,
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'formBarTable',
        name: 'formBarTable',
        component: formBarTable,
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      }
    ]
  }
];
