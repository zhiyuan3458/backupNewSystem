const bottomHideValue = -32;
const app = {
  state: {
    sideBar: {
      opened: true,
      bottomValue: 0
    },
    modalBgShow: false
  },

  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sideBar.opened = !state.sideBar.opened;
      if (state.sideBar.opened) {
        state.sideBar.bottomValue = 0;
      } else {
        state.sideBar.bottomValue = bottomHideValue;
      }
    },
    TOGGLE_MODAL_BG_SHOW: (state, data) => {
      state.modalBgShow = data;
    }
  },

  actions: {
    // 设置出现/隐藏底部导航栏
    toggleSideBar ({commit}) {
      commit('TOGGLE_SIDEBAR');
    },
    // 设置有无模态框背景色
    toggleModalBgShow ({ commit }, data) {
      commit('TOGGLE_MODAL_BG_SHOW', data);
    }
  }
};

export default app;
