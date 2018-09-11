<template>
  <div class="collapsed-wrapper" ref="collapsedWrapper" :style="{width: collapsedWrapperWidth + 'px', marginLeft: collapsedWrapperMarginLeft + 'px'}">
    <div class="collapsed-content">
      <slot name="header"></slot>
      <slot name="content"></slot>
    </div>
    <div class="arrow-wrapper" @mousedown="drag">
      <div class="arrowIcon" :class="arrowClass" @click.stop="handleCollapse"></div>
    </div>
    <!--<div v-show="columnLine" class="column-line" :style="{height: computeCollapsedWrapperHeight}" ref="columnLine"></div>-->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      collapsedWrapperHeight: 0,
      collapsedWrapperWidth: this.collapsedWrapper.width,
      collapsedWrapperMarginLeft: 0,
      arrowClass: 'collapsed-arrow',
      collapsedWrapperWidthTemp: 0,
      expandShow1: this.expandShow
    };
  },

  props: {
    collapsedWrapper: Object,
    expandShow: Boolean
  },

  watch: {
    expandShow: function () {
      this.expandShow1 = this.expandShow;
    }
  },

  created () {
    this.collapsedWrapperWidth = this.collapsedWrapper.width;
  },

  methods: {
    // 拖拽可伸缩侧导航栏函数
    drag (e) {
      // 如果是按了箭头收缩的话，就不给拉动
      if (e.target.className.indexOf('arrowIcon') >= 0) {
        return;
      }
      // 看传入的draggable值是否为true才给拉伸
      if (this.collapsedWrapper.draggable) {
        let that = this;
        document.onmousemove = function (e) {
          e.preventDefault();
          e.stopPropagation();
          let currentMarginWidth = e.clientX - 51;
          let documentWidth = document.body.clientWidth;
          documentWidth = documentWidth - 500;
          if (currentMarginWidth <= 30) {
            that.collapsedWrapperWidth = 30;
            that.$emit('getLzyTableWrapperMarginLeft', {left: 30});
            return;
          }
          if (currentMarginWidth >= documentWidth) {
            that.collapsedWrapperWidth = documentWidth;
            that.$emit('getLzyTableWrapperMarginLeft', {left: documentWidth});
            return;
          }
          // 把collapsedWrapperWidth提交到父组件
          that.$emit('getLzyTableWrapperMarginLeft', {left: currentMarginWidth});
          that.collapsedWrapperWidth = currentMarginWidth;
        };

        document.onmouseup = function () {
          document.onmousemove = null;
        };
      } else {
        return false;
      }
    },

    // 点击侧导航栏的伸缩符可以伸缩侧导航栏
    handleCollapse () {
      if (this.collapsedWrapper.collapsable) {
        let collapsedWrapperMarginLeft = this.collapsedWrapperMarginLeft;
        if (collapsedWrapperMarginLeft === 0) {
          this.collapsedWrapperMarginLeft = -this.collapsedWrapperWidth;
          this.$emit('getLzyTableWrapperMarginLeft', {left: 0});
          this.arrowClass = 'open-arrow';
          this.collapsedWrapper.draggable = false;
        } else {
          this.collapsedWrapperMarginLeft = 0;
          this.$emit('getLzyTableWrapperMarginLeft', {left: this.collapsedWrapperWidth});
          this.arrowClass = 'collapsed-arrow';
          this.collapsedWrapper.draggable = true;
        }
      } else {

      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./less/style.css";
.collapsed-wrapper {
  height: 100%;
  padding: 6px 4px 0 4px;
  border-right: 1px solid #ddd;
  box-sizing: border-box;
  position: relative;
  float: left;

  .collapsed-content {
    overflow: hidden;
  }

  .arrow-wrapper {
    width: 10px;
    height: 100%;
    position: absolute;
    top: 0;
    right: -10px;
    cursor: col-resize;

    .arrowIcon {
      width: 10px;
      height: 83px;
      position: absolute;
      right: 0px;
      top: 280px;
      cursor: pointer;
    }

    .collapsed-arrow {
      background: url('./img/arrow.png') no-repeat 0 0;
    }

    .open-arrow {
      background: url('./img/arrow.png') no-repeat -11px 0;
    }
  }
}
</style>
