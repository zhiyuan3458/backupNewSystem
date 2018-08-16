<template>
<div class="side-bar-wrapper" ref="sideBarWrapper">
  <ul @mouseleave="handleImgHightlightHidden" class="aside-bar-ul">
    <li class="aside-bar-li" v-for="(item, index) in secondMenus" :key="index" @mouseenter="handleImgHightlightShow(index)" :class="{active: activeIndex === index}">
      <!--<img :src="activeIndex === index ? item.imgHoverUrl : item.imgUrl" alt="" width="26"  height="26">-->
      <span :class="item.iconClass" :style="{color: activeIndex === index ? '#F59C00' : '#ccc'}"></span>
    </li>
    <div class="aside-content" :style="{height: treeHeight + 'px'}" v-show="asideBarShow">
      <el-input
        id="sideBarTree"
        placeholder="输入关键字进行过滤"
        v-model="filterText"
      >
      </el-input>
      <ul id="treeNavBar" class="ztree"></ul>
    </div>
  </ul>
  <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sideBar.opened"></hamburger>
</div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import { getMenus } from '@/api/mainFrame/sideBar';
import hamburger from '@/components/hamburger/hamburger';

export default {
  components: {
    hamburger
  },
  data () {
    return {
      // 二级菜单的信息
      secondMenus: [],
      activeIndex: -1,
      // 是否让树形结构显示
      asideBarShow: false,
      filterText: '',
      // 树形高度
      treeHeight: 0,
      // 三级和以上的菜单（树形数据）
      asideTreeMenus: [],
      currentAsideTreeMenus: [],
      setting: {
        callback: {
          onClick: this.handleClickNode
        },
        view: {
          /* 不显示ztree默认的图标 */
          showIcon: false,
          /* 自定义图标 */
          addDiyDom: this.addDiyDom,
          addHoverDom: this.addHoverDom,
          removeHoverDom: this.removeHoverDom
        }
      }
    };
  },
  methods: {
    addDiyDom (treeId, treeNode) {
      let aObj = $('#' + treeNode.tId + '_a');
      if ($('#diyBtn_' + treeNode.id).length > 0) return;
      let iconHtml = `<span class="${treeNode.iconUrl}" style="font-size: 14px;"></span>`;
      aObj.prepend(iconHtml);
    },
    addHoverDom (treeId, treeNode) {
      let that = this;
      if ($(`#short_icon_${treeNode.id}`).length > 0) return;
      if (!treeNode.isParent) {
        let leafDOM = $(`#${treeNode.tId}_a`);
        let shortCutIcon = `<span id="short_icon_${treeNode.id}" class="ct-icon-short-cut" style="margin-left: 5px;" title="添加至快捷方式"></span>`;
        leafDOM.append(shortCutIcon);
        let shortCutSpan = $(`#short_icon_${treeNode.id}`);
        if (shortCutIcon) {
          shortCutSpan.bind('click', function (e) {
            e.stopPropagation();
            that.$store.dispatch('addShortcut', treeNode.id).then(res => {
              if (res.data.code === 406) {
                that.$message({
                  type: 'info',
                  message: '该快捷方式已添加！'
                });
              } else {
                that.$message({
                  type: 'success',
                  message: '添加快捷方式成功！'
                });
              }
            });
          });
        }
      }
    },
    removeHoverDom (treeId, treeNode) {
      $(`#short_icon_${treeNode.id}`).unbind().remove();
    },
    // 把鼠标移进去导航栏
    handleImgHightlightShow (index) {
      this.filterText = '';
      this.activeIndex = index;
      this.asideBarShow = true;
      if (this.asideTreeMenus[index]) {
        this.currentAsideTreeMenus = this.asideTreeMenus[index];
      } else {
        this.currentAsideTreeMenus = [];
      }
      $.fn.zTree.init($('#treeNavBar'), this.setting, this.currentAsideTreeMenus);
    },
    // 鼠标移出去侧导航栏，树形组件消失
    handleImgHightlightHidden () {
      this.activeIndex = -1;
      this.asideBarShow = false;
    },

    // 点击树形结构节点触发
    handleClickNode (event, treeId, treeNode) {
      if (treeNode.path !== '') {
        this.$router.push(treeNode.path);
      }
      // this.$router.push(tree);
    },
    // 点击横竖三条触发动画
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar');
    },
    /* 递归获取三级和以上的菜单的图标 */
    getAsideTreeItemIcon (asideTreeMenus) {
      asideTreeMenus.forEach(item => {
        if (item.children) {
          item.icon = require('@/' + item.iconUrl);
          this.getAsideTreeItemIcon(item.children);
        } else {
          /* 叶子节点 */
          item.icon = require('@/' + item.iconUrl);
        }
      });
    }
  },
  computed: {
    // sideBar的横竖三条属性和navBar展开与隐藏
    ...mapGetters([
      'sideBar',
      'currentSubsystemId'
    ])
  },
  watch: {
    /* 监听vuex中的子系统id，如果变了就把二级菜单以及对应的子菜单也随之变化 */
    currentSubsystemId (oldVal, newVal) {
      // 获得第一个子系统的id
      let id = this.currentSubsystemId;
      // 异步获取子系统的菜单信息
      getMenus(id).then(res => {
        if (res.data.code === this.ERR_OK) {
          let data = res.data.data;
          /* 清空secondMenus和asideTreeMenus */
          this.secondMenus = [];
          this.asideTreeMenus = [];
          data.forEach(item => {
            let obj = Object.assign({}, {
              iconClass: item.iconUrl,
              iconHoverClass: item.iconUrl
            });
            this.secondMenus.push(obj);
            if (item.children) {
              this.asideTreeMenus.push(item.children);
            } else {
              this.asideTreeMenus.push([]);
            }
          });
        }
      });
    }
  },
  created () {
    /* 设置树形菜单的高度 */
    this.$nextTick(() => {
      this.treeHeight = this.$refs.sideBarWrapper.offsetHeight - 1;
    });
  }
};
</script>

<style lang="less">
@import "../../../common/less/theme.less";
@import "../../../../plugins/ztree/css/zTreeStyle.css";
@import "../less/sidebar";

.side-bar-wrapper {
  width: 43px;
  background-color: #34495E;

  .aside-bar-ul {
    width: 100%;
    font-size: 26px;
    margin-top: 10px;
    position: relative;
    .aside-bar-li {
      height: 48px;
      text-align: center;
      line-height: 48px;
      color: #AEB6BE;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;

      &.active {
        border-left: 2px solid orange;
        background: #243342;
      }
    }
    .aside-content {
      width: 200px;
      height: 100%;
      position: absolute;
      z-index: 1;
      top: -11px;
      left: 43px;
      background: #F1F1F1;
      box-shadow: 5px 10px 6px #ddd;

      #treeNavBar {
        background: #F1F1F1;
        .content;
      }
    }
  }

  /*  横竖三条 */
  .hamburger-container {
    line-height: 20px;
    height: 20px;
    position: absolute;
    bottom: 5px;
    padding: 0 10px;

    svg {
      fill: white;
    }
  }
}
</style>
