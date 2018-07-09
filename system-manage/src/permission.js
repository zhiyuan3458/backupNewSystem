import router from './router';
import store from './vuex';
import { Message } from 'element-ui';
import { getToken } from './utils/auth';

router.beforeEach((to, from, next) => {
  if (getToken()) {
    next();
  } else {
      if (to.path === '/login') {
        next();
      } else {
        next('/login');
      }
  }
});
