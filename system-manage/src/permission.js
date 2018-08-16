import router from './router';
import { getToken } from './utils/auth';
import { getSubSystemInfo } from '@/api/mainFrame/navBar';

router.beforeEach((to, from, next) => {
  if (getToken()) {
    /* 如果有token但去了login页面，则不返回from的页面 */
    next();
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next('/login');
    }
  }
});
