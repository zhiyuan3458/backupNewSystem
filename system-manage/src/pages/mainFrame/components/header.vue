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
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown class="icon" trigger="hover" placement="top-end" @mouseenter.native="handleEnter(1)" @mouseleave.native="handleLeave" :class="{active:itemHoverIndex === 1}">
            <span class="ct-icon-question1 iconStyle"></span>
            <el-dropdown-menu slot="dropdown">
            </el-dropdown-menu>
          </el-dropdown>

          <div class="notice-group icon" @mouseenter="contentShow = true" @mouseleave="contentShow = false">
            <span class="ct-icon-bell iconStyle"></span>
            <transition name="el-zoom-in-top">
              <div class="drop-down-menu" v-show="contentShow">
                <div class="side-area">
                  <div class="announcement">
                    <el-badge :value="12" class="item">
                      <a class="link-icon ct-icon-form16" href=""></a>
                    </el-badge>
                    <a class="link-text" href="">公告通知</a>
                  </div>
                  <div class="back-log">
                    <a class="link-icon ct-icon-form9" href=""></a>
                    <a class="link-text" href="">待办事项</a>
                  </div>
                </div>
                  <div class="main-area">
                    <div class="content">
                      <ul class="content-list">
                        <li v-for="(item, index) in content" :key="index">
                          <a class="itemName" href="item.href">{{item.name}}</a>
                          <span class="time">{{item.time}}</span>
                        </li>
                      </ul>
                      <div class="more" v-if="content.length > 5">
                        <a href="">更多>></a>
                      </div>
                    </div>
                  </div>
              </div>
            </transition>
          </div>

          <el-dropdown class="icon" trigger="hover" placement="top-end" @mouseenter.native="handleEnter(3)" @mouseleave.native="handleLeave" :class="{active:itemHoverIndex === 3}">
            <span class="ct-icon-user1 iconStyle"></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span class="el-dropdown-item-text" @click="setDeskSetting" style="display:inline-block;width: 100%;height: 100%;">桌面设置</span></el-dropdown-item>
              <el-badge :value="200" :max="99" class="item">
                <el-dropdown-item>设置</el-dropdown-item>
              </el-badge>
              <el-dropdown-item divided><span class="el-dropdown-item-text" @click="logout">退出登录</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="select-wrapper">
          <el-input
            size="mini"
            v-model="globalSearch"
            placeholder="请输入内容"
            @input="handleSearch"
          ></el-input>
        </div>
      </el-row>
    </header>
    <desk-setting
      :deskSettingShow.sync="deskSettingShow"
    >
    </desk-setting>
    <search :show.sync="searchModelShow"></search>
  </div>
</template>

<script type="text/ecmascript-6">
import deskSetting from './deskSetting';
import Search from '@/pages/mainFrame/components/search';
import { debounce } from '@/utils/util';
import { mapGetters } from 'vuex';

export default {
  components: {
    deskSetting,
    Search
  },
  data () {
    return {
      itemHoverIndex: -1,
      iconMouseEnterLiIndex: -1,
      iconMouseEnterSpanIndex: -1,
      // 选择框的v-model值
      globalSearch: '',
      /* 自定义桌面设置的模态框选项 */
      deskSettingShow: false,
      /* 搜索模态框是否显示和隐藏 */
      searchModelShow: false,
      contentShow: false,
      content: [
        {name: '大中小修项目公告功能...', time: '2018-09-21'},
        {name: '大中小修项目公告功能...', time: '2018-09-21'},
        {name: '大中小修项目公告功能...', time: '2018-09-21'},
        {name: '大中小修项目公告功能...', time: '2018-09-21'},
        {name: '大中小修项目公告功能...', time: '2018-09-21'},
        {name: '大中小修项目公告功能...', time: '2018-09-21'}
      ]
    };
  },

  computed: {
    ...mapGetters([
      'modalBgShow'
    ])
  },

  methods: {
    handleSearch: debounce(function (context, args) {
      context.searchModelShow = true;
    }, 50),
    /**
     * 点击“设置桌面”弹出模态框
     * @author   lvzhiyuan
     * @date     2018/8/21
     */
    setDeskSetting () {
      this.deskSettingShow = true;
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
.item {
  margin-top: 10px;
  margin-right: 40px;
}
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

    .notice-group {
      &:hover {
        background: #3C4B5E;
      }
    }

    .icon {
      width: 47px;
      height: 100%;
      position: relative;
      cursor: pointer;
      text-align: center;
      float: left;

      &.active {
        background: #3C4B5E;
      }

      .drop-down-menu {
        width: 489px;
        height: 260px;
        position: absolute;
        top: 46px;
        left: -442px;
        background-color: #fff;
        color: #404040;
        z-index: 550;
        cursor: default;

        .side-area {
          width: 92px;
          height: 258px;
          float: left;
          border-left: #a6a6a6 1px solid;
          border-top: #a6a6a6 1px solid;
          border-bottom: #a6a6a6 1px solid;
          position: relative;

          &:after {
            height: 96%;
            content: ' ';
            position: absolute;
            top: 3px;
            left: 106px;
            border-right: 1px solid #ddd;
          }

          .announcement {
            width: 50px;
            display: block;
            position: absolute;
            top: 20px;
            left: 24px;
            .link-icon {
              display: block;
              width: 48px;
              height: 48px;
              border: #e2e2e2 1px solid;
              background-color: #fafafa;
              -webkit-border-radius: 3px;
              -moz-border-radius: 3px;
              border-radius: 3px;
              box-shadow: 0 1px 1px rgba(0,0,0,.1);
              cursor: pointer;
              color: #333;
              font-size: 18px;
            }
            .link-text {
              display: block;
              line-height: 35px;
              text-align: center;
              color: #333;
              cursor: pointer;
              font-size: 12px;
            }
          }
          .back-log {
            position: absolute;
            top: 121px;
            left: 24px;
            width: 50px;
            display: block;

            .link-icon {
              display: block;
              width: 48px;
              height: 48px;
              border: #e2e2e2 1px solid;
              background-color: #fafafa;
              -webkit-border-radius: 3px;
              -moz-border-radius: 3px;
              border-radius: 3px;
              box-shadow: 0 1px 1px rgba(0,0,0,.1);
              cursor: pointer;
              color: #333;
              font-size: 18px;
            }
            .link-text {
              display: block;
              line-height: 35px;
              text-align: center;
              color: #333;
              cursor: pointer;
              font-size: 12px;
            }
          }
        }

        .main-area {
          width: 365px;
          height: 258px;
          float: left;
          border-right: #a6a6a6 1px solid;
          border-top: #a6a6a6 1px solid;
          border-bottom: #a6a6a6 1px solid;
          position: relative;
          padding: 0 15px;

          .content {
            padding: 5px;
            .content-list {
              max-height: 200px;
              overflow: hidden;
              li {
                line-height: 32px;
                overflow: hidden;
                border-bottom: 1px solid #F5F5F5;
                transition: all .5s;

                &:last-of-type {
                  border-bottom: 0;
                }

                &:hover {
                  color: red;
                  text-decoration: underline;
                  a {
                    color: red;
                    text-decoration: underline;
                  }
                }

                .itemName {
                  width: 46%;
                  float: left;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  text-decoration: none;
                  color: #6B6B6B;
                }

                .time {
                  float: right;
                }
              }
            }
            .more {
              text-align: right;
              a {
                color: dodgerblue;
              }
            }
          }
        }
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
