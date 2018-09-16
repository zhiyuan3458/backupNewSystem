import Vue from 'vue';
import Router from 'vue-router';
import MainFrame from '@/pages/mainFrame/mainFrame.vue';
import Login from '@/pages/login';
import { roadMaintenanceSystemRouter } from './roadMaintenanceSystem';
import { tradeystemRouters } from './tradeSystem';
import { backStageRouters } from './backStageSystem';

Vue.use(Router);

const routes = [
  {
    path: '',
    name: 'MainFrame',
    component: MainFrame,
    meta: {
      title: 'mainFrame'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'login'
    }
  }
].concat(roadMaintenanceSystemRouter, tradeystemRouters, backStageRouters);

export default new Router({
  routes: routes
});
