/**
 * 快捷方式的vuex
 */
import { getEchartsSortOrder } from '@/api/roadMaintenanceSystem/index.js';
import {ERR_OK} from '../../../common/js/common';

function sortEcharts (echarts) {
  let count = 0;
  let arr = [];
  for (let i = 0; i < echarts.length; i++) {
    if (count % 2 === 1) {
      let bool = echarts[i] && echarts[i].model === '21' ? 1 : 0;
      if (bool) {
        let tempEchartIndex = echarts.findIndex(item => item.model === '11');
        let tempEchart = tempEchartIndex > 0 ? echarts.splice(tempEchartIndex, 1)[0] : null;
        if (tempEchart === null) {
          arr = arr.concat(echarts);
          break;
        } else {
          arr.push(tempEchart);
          count++;
          --i;
        }
      } else {
        arr.push(echarts[i]);
        count++;
        echarts.splice(i, 1);
        --i;
      }
    } else {
      arr.push(echarts[i]);
      count = echarts[i].model === '21' ? count + 2 : ++count;
      echarts.splice(i, 1);
      --i;
    }
  }
  return arr;
}

const deskSetting = {
  state: {
    initEcharts: [],
    innerDialogVisible: false
  },

  mutations: {
    // 获取首页自定义顺序的图表
    GET_DESK_SETTING: (state, data) => {
      state.initEcharts = data;
    }
  },

  actions: {
    // 获取首页自定义顺序的图表
    async getDeskSetting ({ commit }) {
      try {
        const res = await getEchartsSortOrder();
        if (res.data.code === ERR_OK) {
          let data = res.data.data;
          let arr = sortEcharts(data);
          // let model11 = data.filter(item => item.model === '11');
          // let model21 = data.filter(item => item.model === '21');
          // data = model11.concat(model21);
          commit('GET_DESK_SETTING', arr);
        }
        // return await (res);
      } catch (err) {
        console.log(err);
      }
    }
  }
};

export default deskSetting;
