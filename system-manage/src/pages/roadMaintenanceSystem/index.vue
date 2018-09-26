<template>
  <div class="setting">
    <el-aside>
          <bar-chart :echartsData="echarts" v-if="echarts.length !== 0">
          </bar-chart>
    </el-aside>
  </div>
</template>

<script>
import barChart from '@/pages/roadMaintenanceSystem/components/barChart';
import { mapGetters } from 'vuex';
// import { getEchartsList } from '@/api/roadMaintenanceSystem/index.js';

export default {
  components: {
    barChart
  },
  data () {
    return {
      echarts: []
    };
  },

  computed: {
    ...mapGetters([
      'currentSubsystemId',
      'initEcharts'
    ])
  },

  watch: {
    initEcharts () {
      this.echarts = this.initEcharts.filter(initEchart => initEchart.isTarget === '1');
    }
  },
  created () {
    this.$store.dispatch('getDeskSetting');
  }
};
</script>

<style scoped lang="less">
@import "common/css/fonts.css";
.setting {
  height: 100%;
  /*@media only screen and (min-device-width: 1439px) {*/
    /*.el-aside {*/
      /*width: 68%!important;*/
    /*}*/
  /*}*/
  /*@media only screen and (min-device-width: 1279px) {*/
    .el-aside {
      width: calc(100%)!important;
    }
  /*}*/
  .el-aside {
    margin-top: 10px;
    float: left;
    overflow-x: hidden;
  }

  .main {
    width: 405px;
    float: right;
    margin: 20px 25px 0 0px;

    .el-row {
      margin-bottom: 30px;
    }
  }
}
</style>
