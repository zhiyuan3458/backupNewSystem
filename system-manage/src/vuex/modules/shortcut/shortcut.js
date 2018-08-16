/**
 * 快捷方式的vuex
 */
import { addShortcut } from '@/api/mainFrame/sideBar';
import {ERR_OK} from '../../../common/js/common';

const shortcut = {
  state: {
    shortcut: {}
  },

  mutations: {
    // 添加快捷方式
    ADD_SHORTCUT: (state, data) => {
      state.shortcut = data;
    }
  },

  actions: {
    // 添加快捷方式
    async addShortcut ({ commit }, data) {
      try {
        let carteId = data;
        const res = await addShortcut(carteId);
        if (res.data.code === ERR_OK) {
          let carte = Object.assign({}, {
            id: res.data.data.id,
            name: res.data.data.name,
            path: res.data.data.path,
            iconUrl: res.data.data.iconUrl
          });
          commit('ADD_SHORTCUT', carte);
        }
        return await (res);
      } catch (err) {
        console.log(err);
      }
    }
  }
};

export default shortcut;
