<template>
  <div>
    <!-- 头部导航栏 -->
    <header class="header">
      <el-row>
        <div class="logo-wrapper">
          <img class="logo" src="../img/logo.png" alt="">
          <span class="main-title">系统管理平台</span>
        </div>
        <div class="top-icon-wrapper">
          <el-dropdown class="icon" trigger="hover" placement="top-end" @mouseenter.native="handleEnter(0)" @mouseleave.native="handleLeave" :class="{active:itemHoverIndex === 0}">
            <span class="ct-icon-home2 iconStyle"></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown class="icon" trigger="hover" placement="top-end" @mouseenter.native="handleEnter(1)" @mouseleave.native="handleLeave" :class="{active:itemHoverIndex === 1}">
            <span class="ct-icon-question1 iconStyle"></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息1</el-dropdown-item>
              <el-dropdown-item>设置1</el-dropdown-item>
              <el-dropdown-item divided>退出登录1</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown class="icon" trigger="hover" placement="top-end" @mouseenter.native="handleEnter(2)" @mouseleave.native="handleLeave" :class="{active:itemHoverIndex === 2}">
            <span class="ct-icon-bell iconStyle"></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>待办事项</el-dropdown-item>
              <el-dropdown-item>公告通知</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown class="icon" trigger="hover" placement="top-end" @mouseenter.native="handleEnter(3)" @mouseleave.native="handleLeave" :class="{active:itemHoverIndex === 3}">
            <span class="ct-icon-user1 iconStyle"></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span class="el-dropdown-item-text" @click="setDeskSetting" style="display:inline-block;width: 100%;height: 100%;">桌面设置</span></el-dropdown-item>
              <el-dropdown-item>设置1</el-dropdown-item>
              <el-dropdown-item divided><span class="el-dropdown-item-text" @click="logout">退出登录</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="select-wrapper">
          <el-autocomplete
            size="mini"
            v-model="globalSearch"
            :trigger-on-focus="false"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
      </el-row>
    </header>
    <desk-setting
      :deskSettingShow.sync="deskSettingShow"
    >
    </desk-setting>
  </div>
</template>

<script type="text/ecmascript-6">
import deskSetting from './deskSetting.vue';
export default {
  components: {
    deskSetting
  },
  data () {
    return {
      queryList: [],
      timeout: null,
      itemHoverIndex: -1,
      iconMouseEnterLiIndex: -1,
      iconMouseEnterSpanIndex: -1,
      // 选择框的v-model值
      globalSearch: '',
      /* 自定义桌面设置的模态框选项 */
      deskSettingShow: false
    };
  },

  created () {
    this.queryList = this.loadAll();
  },

  methods: {
    /**
     * 点击“设置桌面”弹出模态框
     * @author   lvzhiyuan
     * @date     2018/8/21
     */
    setDeskSetting () {
      this.deskSettingShow = true;
    },
    /* 模拟输入建议的数据 */
    loadAll () {
      return [
        {'value': '国家法律', 'url': '/roadMaintenanceSystem/list'},
        {'value': '国家法规', 'url': '/roadMaintenanceSystem/list'},
        {'value': '国家文件', 'url': '/roadMaintenanceSystem/list'},
        {'value': '地方条例', 'url': '/roadMaintenanceSystem/list'}
      ];
    },
    /**
     * 返回输入建议的方法
     * @author   lvzhiyuan
     * @date     2018/8/22
     * @param    queryString——查询的参数
     * @param    cb——回调函数
     */
    querySearchAsync (queryString, cb) {
      console.log(queryString);
      console.log(cb);
      let queryList = this.queryList;
      let results = queryString ? queryList.filter(this.createStateFilter(queryString)) : queryList;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000);
    },
    createStateFilter (queryString) {
      return state => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    /**
     * 自动提示框中点击搜索则跳转页面
     * @author   lvzhiyuan
     * @date     2018/8/22
     * @param    item——路由
     */
    handleSelect (item) {
      this.$router.push(item.url);
      this.globalSearch = '';
    },
    /**
     * 登出
     * @author   lvzhiyuan
     * @date     2018/8/22
     */
    logout () {
      this.$store.dispatch('logout').then(res => {
        if (res.data.code === this.ERR_OK) {
          sessionStorage.removeItem('currentSubsystemId');
          location.reload();
        } else {
          this.$message({
            message: '登出失败，请重新登出！',
            type: 'error'
          });
        }
      });
    },
    // 移动进右上角的四个图标触发
    handleEnter (index) {
      this.itemHoverIndex = index;
    },
    // 移动出去右上角的四个图标触发
    handleLeave () {
      this.itemHoverIndex = 5;
    }
  }
};
</script>

<style lang="less">
@import "../../../common/less/theme";
@import "../../../common/less/fonts.css";
@import "../../../common/less/border1px.less";
  /* 头部 */
  .header {
    background: #56A2E8;

    .logo-wrapper {
      float: left;
      margin-right: 17px;
      .logo {
        margin: 8px 0 0 5px;
      }

      .main-title {
        display: inline-block;
        color: #fff;
        font-size: 20px;
        margin: 0 0 0 5px;
        vertical-align: super;
        font-weight: 600;
      }
    }

    .select-wrapper {
      line-height: 45px;
      float: right;

      .el-input__inner {
        width: 100%;
        height: 28px;
        line-height: 28px;
        -webkit-appearance: none;
        background-color: #56A2E8;
        border-radius: 15px;
        border: 1px solid white;
        box-sizing: border-box;
        color: white!important;
      }
    }

    .top-icon-wrapper {
      float: right;
      height: 47px;
      line-height: 47px;
      overflow: hidden;

      .home {
        display: inline-block;
        width: 40px;
        height: 35px;
        background: url('../img/head_icon.png') -110px -6px no-repeat;
        margin: 0 auto;
      }

      .bell {
        display: inline-block;
        vertical-align: middle;
        width: 40px;
        height: 35px;
        background: url('../img/head_icon.png') -284px -7px no-repeat;
      }

      .question {
        display: inline-block;
        width: 40px;
        height: 35px;
        background: url('../img/head_icon.png') -205px -6px no-repeat;
      }

      .user {
        display: inline-block;
        width: 40px;
        height: 35px;
        background: url('../img/head_icon.png') -246px -6px no-repeat;
      }

      .icon {
        width: 47px;
        height: 100%;
        cursor: pointer;
        text-align: center;
        float: left;

        &.active {
          background: #3C4B5E;
        }

        .iconStyle {
          width: 100%;
          height: 100%;
          display: inline-block;
          font-size: 20px;
          color: white;
        }
        .el-dropdown-item-text {
          width: 100%;
          height: 100%;
          display: inline-block;
        }
      }
    }
  }
</style>
