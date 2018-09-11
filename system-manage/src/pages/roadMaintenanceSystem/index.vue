<template>
  <div class="setting">
    <el-aside>
      <!--<el-row :gutter="5">-->
        <!--<el-col :span="12" v-for="item in echart" :key="item.id">-->
          <bar-chart
           :echartsData="echarts">
          </bar-chart>
        <!--</el-col>-->
      <!--</el-row>-->
    </el-aside>

    <!-- 公告 -->
    <!--<div class="main">-->
      <!--<el-row>-->
        <!--<v-NoticeBoard-->
          <!--class="modal"-->
          <!--:header="backlogContent.header"-->
          <!--:content="backlogContent.content"-->
          <!--:iconClass="backlogContent.iconClass">-->
        <!--</v-NoticeBoard>-->
      <!--</el-row>-->
      <!--<el-row>-->
        <!--<v-NoticeBoard-->
          <!--class="modal"-->
          <!--:header="backReadContent.header"-->
          <!--:content="backReadContent.content"-->
          <!--:iconClass="backReadContent.iconClass">-->
        <!--</v-NoticeBoard>-->
      <!--</el-row>-->
      <!--<el-row>-->
        <!--<shortcut-->
          <!--class="modal"-->
          <!--:header="noticeContent.header"-->
          <!--:content="noticeContent.content"-->
          <!--:iconClass="noticeContent.iconClass"-->
          <!--:initShortcuts="shortcuts"-->
          <!--@deleteShortcut="deleteShortcut"-->
          <!--@moveEnd="handleMoveEnd"-->
        <!--&gt;-->
        <!--</shortcut>-->
      <!--</el-row>-->
    <!--</div>-->
  </div>
</template>

<script>
import NoticeBoard from '@/components/noticeBoard/NoticeBoard';
import shortcut from '@/components/shortcut';
import barChart from '@/pages/roadMaintenanceSystem/components/barChart';
import { mapGetters } from 'vuex';
import { getShortcutsList, deleteShortcuts, dragDrop } from '@/api/roadMaintenanceSystem/index';

export default {
  components: {
    'v-NoticeBoard': NoticeBoard,
    shortcut,
    barChart
  },
  data () {
    return {
      shortcuts: [],
      echarts: [],

      // 待办事项
      backlogContent: {
        header: '待办事项',
        content: [
          {
            id: '1',
            name: '公路沙凤三路啥地方即可蓝色的',
            time: '2018-10-31 14:20'
          },
          {
            id: '2',
            name: '公路沙凤三路啥地方即可蓝色的1',
            time: '2018-10-31 14:20'
          },
          {
            id: '3',
            name: '公路沙凤三路啥地方即可蓝色的2',
            time: '2018-10-31 14:20'
          },
          {
            id: '4',
            name: '公路沙凤三路啥地方即可蓝色的3',
            time: '2018-10-31 14:20'
          },
          {
            id: '5',
            name: '公路沙凤三路啥地方即可蓝色的4',
            time: '2018-10-31 14:20'
          }
        ],
        iconClass: 'el-icon-tickets'
      },
      backReadContent: {
        header: '待办事项',
        content: [
          {
            id: '1',
            name: '公路沙凤三路啥地方即可蓝色的',
            time: '2018-10-31 14:20'
          },
          {
            id: '2',
            name: '公路沙凤三路啥地方即可蓝色的1',
            time: '2018-10-31 14:20'
          },
          {
            id: '3',
            name: '公路沙凤三路啥地方即可蓝色的2',
            time: '2018-10-31 14:20'
          },
          {
            id: '4',
            name: '公路沙凤三路啥地方即可蓝色的2',
            time: '2018-10-31 14:20'
          },
          {
            id: '5',
            name: '公路沙凤三路啥地方即可蓝色的2',
            time: '2018-10-31 14:20'
          }
        ],
        iconClass: 'icon-book-open'
      },
      noticeContent: {
        header: '常用快捷键',
        content: [
          {
            id: '1',
            name: '公路沙凤三路啥地方即可蓝色的',
            time: '2018-10-31 14:20'
          },
          {
            id: '2',
            name: '公路沙凤三路啥地方即可蓝色的1',
            time: '2018-10-31 14:20'
          },
          {
            id: '3',
            name: '公路沙凤三路啥地方即可蓝色的2',
            time: '2018-10-31 14:20'
          },
          {
            id: '4',
            name: '公路沙凤三路啥地方即可蓝色的2',
            time: '2018-10-31 14:20'
          },
          {
            id: '5',
            name: '公路沙凤三路啥地方即可蓝色的2',
            time: '2018-10-31 14:20'
          }
        ],
        iconClass: 'ct-icon-short-cut-group'
      }
    };
  },

  computed: {
    ...mapGetters([
      'shortcut',
      'currentSubsystemId',
      'initEcharts'
    ]),
    shortCutId () {
      if (this.shortcut.id) {
        return this.shortcut.id;
      } else {
        return false;
      }
    }
  },

  watch: {
    shortCutId () {
      if (this.shortCutId) {
        this.shortcuts.push(this.shortcut);
      }
    },
    initEcharts () {
      this.echarts = this.initEcharts.filter(initEchart => initEchart.isTarget === '1');
    }
  },

  methods: {
    deleteShortcut (id) {
      deleteShortcuts(id).then(res => {
        if (res.status === this.ERR_OK) {
          this.shortcuts.remove(this.shortcuts.find(item => item.id === id));
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
        } else {
          this.$message({
            message: '删除失败！',
            type: 'info'
          });
        }
      });
    },
    handleMoveEnd (shortcuts) {
      let ids = [];
      shortcuts.forEach(shortcut => ids.push(shortcut.id));
      ids = ids.join(',');
      dragDrop(ids).then(res => {
      }, err => {
        console.log(JSON.stringify(err));
      });
    }
  },

  created () {
    this.$store.dispatch('getDeskSetting');
    getShortcutsList(sessionStorage.getItem('currentSubsystemId')).then(res => {
      if (res.data.code === this.ERR_OK) {
        let cartes = res.data.data;
        cartes.map(carte => Object.assign({}, {
          id: carte.id,
          name: carte.name,
          iconUrl: carte.iconUrl,
          path: carte.path
        }));
        this.shortcuts = cartes;
      }
    });
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
