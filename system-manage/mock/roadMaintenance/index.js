import Mock from 'mockjs';
import { param1Obj, param2Obj } from '@/utils/util';
Mock.setup({
  timeout: 100
});

var echarts = [];
let x = 0;
let y = -1;
for (let i = 0; i < 7; i++) {
  x = i % 4 === 0 ? 0 : x + 1;
  let obj = {
    id: i,
    title: Mock.Random.cword(3, 7),
    url: `/echart/data/rd=${i}`,
    position: {
      x: x,
      y: x % 4 === 0 ? ++y : y,
      w: 1,
      h: 1,
      i: i + ''
    },
    isTarget: '1'
  };
  echarts.push(obj);
}

let echartsData = [];
for (let i = 0; i < 7; i++) {
  let obj = Mock.mock({
    id: i,
    'xAxis|6': ['@cname(2)'],
    'yAxis|6': ['@float(60, 100)']
  });
  echartsData.push(obj);
};

Mock.mock(/\/echarts\/list\.*/, function (options) {
  return {
    code: 200,
    data: echarts
  };
});

/* 获取每个图表的数据 */
Mock.mock(/\/echart\/data\.*/, function (options) {
  let id = param2Obj(options.url).id;
  let data = echartsData.find(item => item.id === Number(id));
  return {
    code: 200,
    data: data
  };
});

/* resize后请求的后台 */
Mock.mock('/echarts/resize', 'post', function (options) {
  let data = param1Obj(options.body);
  let resizedEchart = echarts.find(echart => echart.position.i === data.i);
  resizedEchart.position.w = data.w;
  resizedEchart.position.h = data.h;
  return {
    code: 200,
    data: resizedEchart
  };
});

/* 使用穿梭框后调整哪些图表可见哪些不可见 */
Mock.mock('/echarts/showEcharts', 'post', function (options) {
  let ids = param1Obj(options.body).ids;
  ids = ids.split(',');
  echarts.forEach(echart => {
    if (ids.find(id => echart.id === Number(id))) {

    } else {
      echart.isTarget = '0';
    }
  });
  return {
    code: 200,
    data: echarts
  };
});
