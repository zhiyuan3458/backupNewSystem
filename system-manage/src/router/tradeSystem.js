/* 交易平台系统的路由 */
const _import = require('./_import_' + process.env.NODE_ENV);

/* 主框，永远不变 */
const mainFrame = _import('mainFrame/mainFrame');
const index = _import('tradeSystem/index');
const listCompanyInfo = _import('tradeSystem/cydwxxtbjwh/listCompanyInfo');
const listMemberInfo = _import('tradeSystem/cydwxxtbjwh/listMemberInfo');

export const tradeystemRouters = [
  {
    path: '/tradeSystem',
    component: mainFrame,
    redirect: '/tradeSystem/index',
    children: [
      {
        path: 'index',
        component: index,
        name: '交易平台首页',
        meta: {
          subSystemId: '123457'
        }
      },
      {
        path: 'companyInfo',
        component: listCompanyInfo,
        name: '企业信息填报及维护',
        meta: {
          subSystemId: '123457'
        }
      },
      {
        path: 'memberInfo',
        component: listMemberInfo,
        name: '人员信息填报及维护',
        meta: {
          subSystemId: '123457'
        }
      }
    ]
  }
];
