<template>
  <div class="chart-group">
    <!--<div class="chart-item"-->
       <!--v-for="(item, index) in echartsData"-->
       <!--:key="index"-->
       <!--:class="[item.model === '11' ? 'chart' : 'twiceChart']"-->
    <!--&gt;-->
      <!--<p>-->
        <!--<span class="title">{{item.title}}</span>-->
      <!--</p>-->
      <!--<div-->
      <!--:id="'bar_chart_' + item.id"-->
      <!--style="height:300px;">-->
      <!--</div>-->
    <!--</div>-->
    <grid-layout
      :layout="layout"
      :col-num="3"
      :row-height="350"
      :max-rows="4"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >

      <grid-item v-for="item in layout" :key="item.i"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 :dragIgnoreFrom="haha"
                 @resized="resizedEvent"
      >
        <div class="chart-item" style="width: 100%; height: 100%;">
          <p>
           <span class="title">国道</span>
          </p>
          <div :id="item.i" class="diuni" style="width: 99%; height: 88%;"></div>
        </div>
      </grid-item>
    </grid-layout>
  </div>

  <!--<div-->
    <!--v-for="(item, index) in echartsData"-->
    <!--:key="index"-->
    <!--:id="'bar_chart_' + item.id"-->
    <!--:class="[item.model === '11' ? 'chart' : 'twiceChart']"-->
    <!--style="height:300px;float: left;">-->
  <!--</div>-->
</template>

<script type="text/ecmascript-6">
import VueGridLayout from 'vue-grid-layout';
import { getEchartInfo, getEchartData } from '@/pages/roadMaintenanceSystem/components/barChart/mock.js';
const baseUrl = '/base';

let GridLayout = VueGridLayout.GridLayout;
let GridItem = VueGridLayout.GridItem;

var itemStyle = {
  normal: {
  },
  emphasis: {
    barBorderWidth: 1,
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: 'rgba(0,0,0,0.5)'
  }
};

export default {
  components: {
    GridLayout,
    GridItem
  },
  props: {
    echartsData: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      haha: '.diuni',
      charts: [],
      layout: [
        {x: 0, y: 0, w: 1, h: 1, i: '0'},
        {x: 1, y: 0, w: 1, h: 1, i: '1'},
        {x: 2, y: 0, w: 1, h: 1, i: '2'},
        {x: 0, y: 1, w: 1, h: 1, i: '3'},
        {x: 1, y: 1, w: 1, h: 1, i: '4'},
        {x: 2, y: 1, w: 1, h: 1, i: '5'},
        {x: 0, y: 2, w: 1, h: 1, i: '6'}
      ]
    };
  },
  mounted () {
    this.initChart();
  },
  methods: {
    initChart () {
      getEchartInfo().then(res => {
        let code = res.data.code;
        if (code === this.ERR_OK) {
          let echartsInfo = res.data.data.echartsInfo;
          echartsInfo.forEach(async item => {
            try {
              let res = await getEchartData(item.id);
              let code = res.data.code;
              if (code === this.ERR_OK) {
                res.data.data.forEach((item, index) => {
                  let option = {
                    backgroundColor: 'white',
                    legend: {
                      data: ['bar', 'bar2', 'bar3', 'bar4'],
                      align: 'left',
                      left: 10
                    },
                    toolbox: {
                      feature: {
                        magicType: {
                          type: ['stack', 'tiled']
                        },
                        dataView: {}
                      }
                    },
                    xAxis: {
                      data: item.xAxis,
                      name: 'X Axis',
                      silent: false,
                      axisLine: {onZero: true},
                      splitLine: {show: false},
                      splitArea: {show: false}
                    },
                    yAxis: {
                      inverse: true,
                      splitArea: {show: false}
                    },
                    grid: {
                      left: 100
                    },
                    visualMap: {
                      type: 'continuous',
                      dimension: 1,
                      text: ['High', 'Low'],
                      inverse: true,
                      itemHeight: 200,
                      calculable: true,
                      min: -2,
                      max: 6,
                      top: 60,
                      left: 10,
                      inRange: {
                        colorLightness: [0.4, 0.8]
                      },
                      outOfRange: {
                        color: '#bbb'
                      },
                      controller: {
                        inRange: {
                          color: '#2f4554'
                        }
                      }
                    },
                    dataZoom: [{
                      type: 'inside'
                    }, {
                      type: 'slider'
                    }],
                    series: [
                      {
                        name: 'bar',
                        type: 'bar',
                        stack: 'one',
                        itemStyle: itemStyle,
                        data: item.yAxis.data1
                      },
                      {
                        name: 'bar2',
                        type: 'bar',
                        stack: 'one',
                        itemStyle: itemStyle,
                        data: item.yAxis.data2
                      },
                      {
                        name: 'bar3',
                        type: 'bar',
                        stack: 'two',
                        itemStyle: itemStyle,
                        data: item.yAxis.data3
                      },
                      {
                        name: 'bar4',
                        type: 'bar',
                        stack: 'two',
                        itemStyle: itemStyle,
                        data: item.yAxis.data4
                      }
                    ]
                  };
                  let chartId = document.getElementById(index);
                  let chart = this.$echarts.init(chartId);
                  this.charts.push(chart);
                  chart.setOption(option);
                  window.addEventListener('resize', function () {
                    let chartId = document.getElementById(index);
                    let width = chartId.offsetWidth;
                    let height = chartId.offsetHeight;
                    chart.resize({
                      width,
                      height
                    });
                  }, false);
                });
              }
            } catch (e) {
              console.log(JSON.stringify(e));
            }
          });
        }
      });
//      this.echartsData.forEach(async item => {
//        try {
//          let res = await this.$axios.get(baseUrl + item.url);
//          let option;
//          let code = res.data.code;
//          if (code === this.ERR_OK) {
//            let initData = {
//              xAxis: [],
//              yAxis: [],
//              dataShadows: []
//            };
//            res.data.data.forEach(item => {
//              initData.xAxis.push(item.code);
//              initData.yAxis.push(item.length);
//              initData.dataShadows.push(200);
//            });
//
//            option = {
//              xAxis: {
//                data: initData.xAxis,
//                axisLabel: {
//                  inside: true,
//                  textStyle: {
//                    color: '#333'
//                  }
//                },
//                axisTick: {
//                  show: false
//                },
//                axisLine: {
//                  show: true
//                },
//                z: 10
//              },
//              grid: {
//                top: 60,
//                left: '10%',
//                right: '5%',
//                bottom: 10
//
//              },
//              yAxis: {
//                axisLine: {
//                  show: false
//                },
//                axisTick: {
//                  show: false
//                },
//                axisLabel: {
//                  textStyle: {
//                    color: '#999'
//                  }
//                }
//              },
//              dataZoom: [
//                {
//                  type: 'inside'
//                }
//              ],
//              series: [
//                { // For shadow
//                  type: 'bar',
//                  itemStyle: {
//                    normal: {color: 'rgba(0,0,0,0.05)'}
//                  },
//                  barGap: '-100%',
//                  barCategoryGap: '40%',
//                  animation: false
//                },
//                {
//                  type: 'bar',
//                  itemStyle: {
//                    normal: {
//                      color: new this.$echarts.graphic.LinearGradient(
//                        0, 0, 0, 1,
//                        [
//                          {offset: 0, color: '#83bff6'},
//                          {offset: 0.5, color: '#188df0'},
//                          {offset: 1, color: '#188df0'}
//                        ]
//                      )
//                    },
//                    emphasis: {
//                      color: new this.$echarts.graphic.LinearGradient(
//                        0, 0, 0, 1,
//                        [
//                          {offset: 0, color: '#2378f7'},
//                          {offset: 0.7, color: '#2378f7'},
//                          {offset: 1, color: '#83bff6'}
//                        ]
//                      )
//                    }
//                  },
//                  data: initData.yAxis
//                }
//              ]
//            };
//            let chart = this.$echarts.init(document.getElementById('bar_chart_' + item.id));
//            chart.setOption(option);
//            let chartId = document.getElementById('bar_chart_' + item.id);
//            let width = chartId.offsetWidth;
//            let height = chartId.offsetHeight;
//            chart.resize({
//              width: width,
//              height: height
//            });
//            window.addEventListener('resize', function () {
//              let chartId = document.getElementById('bar_chart_' + item.id);
//              let width = chartId.offsetWidth;
//              let height = chartId.offsetHeight;
//              chart.resize({
//                width,
//                height
//              });
//            }, false);
//          }
//        } catch (e) {
//          console.log(JSON.stringify(e));
//        }
//      });
    },
    resizedEvent (i, newH, newW, newHPx, newWPx) {
      this.charts.find(chart => chart._dom.id === i).resize({
        width: newWPx,
        height: newHPx - 40
      });
    }
  }
};
</script>

<style lang="less" scoped>
.chart-group {
  overflow: hidden;
}
.twiceChart {
  width: 98%;
}
.chart {
  width: 48%;
}
  .chart-item {
    border-radius: 5px 5px 0 0;
    border: #ccc 1px solid;
    margin: 11px 6px 0 6px;
    height: 350px;
    float: left;

    p {
      height: 35px;
      line-height: 35px;
      border-radius: 5px 5px 0 0;
      border-bottom: #ddd 1px solid;
      color: #56a2e8;
      font-size: 16px;
      font-family: "微软雅黑";
      padding-left: 13px;
    }
  }
</style>
