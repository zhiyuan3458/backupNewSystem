import router from './router';
import store from './vuex';
import { Message } from 'element-ui';
import { getToken } from './utils/auth';

router.beforeEach((to, from, next) => {
  if (getToken()) {
    /* 如果有token但去了login页面，则不返回from的页面 */
    if (to.path === '/login') {
      next(from.path);
    } else {
      next();
    }
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next('/login');
    }
  }
});
