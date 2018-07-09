<template>
  <!-- 新增框 -->
<div class="form-wrapper" ref="formWrapper" v-show="formVisible">
    <!-- 新增框title -->
    <div class="title-wrapper">
      <h2 class="title">{{title}}</h2>
      <span class="el-icon-close" @click="close"></span>
    </div>
    <div class="content-wrapper" :style="{height: contentWrapperHeight + 'px'}">
      <div class="fix-wrapper" ref="fixWrapper">
        <!-- 按钮工具组 -->
        <div class="btn-group" ref="btnGroup" slot="toolBar">
          <slot name="buttonGroup"></slot>
        </div>
      </div>
      <!-- 修正fixed之后不能定高的bug -->
      <div class="hack-fixed"></div>
      <!-- 新增框表单 -->
      <slot name="formWrapper"></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    formVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    contentWrapperHeight: {
      type: Number
    }
  },
  methods: {
    /* 关闭模态框 */
    close () {
      this.$emit('close');
    }
  }
};
</script>

<style lang="less" scoped>
.form-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background: white;
  box-sizing: border-box;
  padding: 10px;

  .title-wrapper {
    color: white;
    background: dodgerblue;
    height: 40px;
    overflow: hidden;
    line-height: 40px;

    h2.title {
      float: left;
      margin-left: 10px;
      .title;
    }

    .el-icon-close {
      float: right;
      cursor: pointer;
      margin: 10px 10px 0 0;
    }
  }

  /* 内容项 */
  .content-wrapper {
    border: 1px solid #ddd;
    border-top: 0;
    padding: 0 5px;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: auto;
    /* 工具栏 */
    .fix-wrapper {
      width: calc(100% - 360px);
      position: fixed;
      padding-top: 8px;
      z-index: 1000;
      background: white;
      .btn-group {
        padding:0 0 8px 8px;
        border-bottom: 1px solid #ddd;
      }
    }
    /* 修正fixed后的bug */
    .hack-fixed {
      opacity: 0;
      height: 50px;
      z-index: 1;
    }
  }
}
</style>
