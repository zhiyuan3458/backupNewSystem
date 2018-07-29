/* 与user信息与token有关的vuex */
import { getToken, setTokenInCookie, removeToken, setGetTokenTime } from '@/utils/auth';
import { loginByUserName } from '@/api/login/login';
import { logout } from '@/api/mainFrame/header';
import { ERR_OK } from '@/common/js/common';

const user = {
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data;
    }
  },
  actions: {
    /* 设置token */
    setToken ({ commit }, token) {
      commit('SET_TOKEN', token);
    },
    /* 登录 */
    async login ({ commit }, loginInfo) {
      try {
        const res = await loginByUserName(loginInfo);
        if (res.status === ERR_OK) {
          const token = {
            accessToken: res.data.access_token,
            refreshToken: res.data.refresh_token
          };
          setTokenInCookie(token);
          /* 设置登录（获取token）时间 */
          setGetTokenTime();
          commit('SET_TOKEN', res.data.access_token);
        } else {
          throw new Error(res);
        }
        return await (res);
      } catch (err) {
        console.log('登录错误： ' + err);
      }
    },
    /* 登出 */
    async logout ({ commit }) {
      try {
        const res = await logout(getToken());
        let code = res.data.code;
        if (code === ERR_OK) {
          removeToken();
          commit('SET_TOKEN', '');
        } else {
          throw new Error(res);
        }
        return await (res);
      } catch (err) {
        console.log('登出失败！');
      }
    }
  }
};

export default user;
