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
      :col-num="4"
      :row-height="230"
      :max-rows="4"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >

      <grid-item v-for="(item, index) in layout" :key="index"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 dragIgnoreFrom=".content"
                 @resized="resizedEvent"
      >
        <div class="chart-item" style="width: 100%; height: 100%;">
          <p>
           <span class="title">{{item.title}}</span>
          </p>
          <div :id="item.i" class="content" style="width: 99%; height: 88%;"></div>
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
import { resizeChart, getEchartData } from '@/pages/roadMaintenanceSystem/components/barChart/mock';
// const baseUrl = '/base';

let GridLayout = VueGridLayout.GridLayout;
let GridItem = VueGridLayout.GridItem;

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
      charts: [],
      layout: []
    };
  },
  watch: {
    echartsData (newVal) {
      this.layout = newVal.map(item => {
        return {
          ...item.position,
          title: item.title
        };
      });
    }
  },
  mounted () {
    setTimeout(() => {
      this.initChart();
    }, 20);
  },
  methods: {
    initChart () {
      this.echartsData.forEach(async (item, index) => {
        let obj = {
          ...item.position,
          title: item.title
        };
        this.layout.push(obj);
        try {
          let res = await getEchartData(item.url, index);
          let code = res.data.code;
          if (code === this.ERR_OK) {
            let option = {
              xAxis: {
                data: res.data.data.xAxis,
                axisLabel: {
                  inside: true,
                  textStyle: {
                    color: '#333'
                  }
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: true
                },
                z: 10
              },
              grid: {
                top: 60,
                left: '10%',
                right: '5%',
                bottom: 10

              },
              yAxis: {
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  textStyle: {
                    color: '#999'
                  }
                }
              },
              dataZoom: [
                {
                  type: 'inside'
                }
              ],
              series: [
                { // For shadow
                  type: 'bar',
                  itemStyle: {
                    normal: {color: 'rgba(0,0,0,0.05)'}
                  },
                  barGap: '-100%',
                  barCategoryGap: '40%',
                  animation: false
                },
                {
                  type: 'bar',
                  itemStyle: {
                    normal: {
                      color: new this.$echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                          {offset: 0, color: '#83bff6'},
                          {offset: 0.5, color: '#188df0'},
                          {offset: 1, color: '#188df0'}
                        ]
                      )
                    },
                    emphasis: {
                      color: new this.$echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                          {offset: 0, color: '#2378f7'},
                          {offset: 0.7, color: '#2378f7'},
                          {offset: 1, color: '#83bff6'}
                        ]
                      )
                    }
                  },
                  data: res.data.data.yAxis
                }
              ]
            };
            let chart = this.$echarts.init(document.getElementById(item.id));
            chart.setOption(option);
            this.charts.push(chart);
            window.addEventListener('resize', function () {
              let chartId = document.getElementById(item.id);
              let width = chartId.offsetWidth;
              let height = chartId.offsetHeight;
              chart.resize({
                width,
                height
              });
            }, false);
          }
        } catch (e) {
          console.log('error: ' + e);
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
      let obj = {
        i: i,
        w: newW,
        h: newH
      };
      resizeChart(obj).then(res => {
      }, err => {
        console.log('err: ' + JSON.stringify(err));
      });
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
