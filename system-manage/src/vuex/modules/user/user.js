/* 与user信息与token有关的vuex */
import { getToken, setTokenInCookie } from '@/utils/auth';

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
    setToken ({ commit }, token) {
      setTokenInCookie(token);
      commit('SET_TOKEN', token.accessToken);
    }
  }
};

export default user;
