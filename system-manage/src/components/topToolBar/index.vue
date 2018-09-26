<template>
  <div class="tool-wrapper" ref="toolWrapper">
    <!-- 按钮组 -->
    <div class="btn-group" ref="btnGroup">
      <el-button
        size="mini"
        class="btn-item"
        v-for="(item, index) in btnList"
        :key="index"
        :icon="item.icon"
        @click="handleClick(item.name)">
        {{item.name}}
      </el-button>
    </div>
    <!-- 导航位置 -->
    <div class="nav-bar" ref="navBar">
      <el-breadcrumb separator-class="el-icon-minus">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbs"
          :key="index"
        >
          <span v-if="index === 0" class="el-icon-star-on"></span>
          {{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'btnGroup',
  props: {
    btnList: {
      type: Array,
      required: true,
      default: function () {
        return [];
      }
    },
    breadcrumbs: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleClick (name) {
      this.$emit('handleClick', name);
    }
  }
};
</script>

<style lang="less">
.tool-wrapper {
  .btn-group {
    padding: 4px 0;
    border-bottom: 1px solid #ddd;

    .btn-item {
      margin-right: 8px!important;
      span {
        margin-left: 0;
      }
    }

    .el-icon-plus {
      color: #D85C0D;
      font-weight: 700;
    }

    .el-icon-delete {
      color: #DC3F2C;
      font-weight: 700;
    }

    .el-icon-upload2 {
      color: #217FBC;
      font-weight: 700;
    }

    .el-icon-download {
      color: #2FA2E0;
      font-weight: 700;
    }
  }
  .nav-bar {
    display: inline-block;
    margin: 5px 0;
    .content;

    .el-icon-star-on {
      display: inline-block;
      margin-right: 5px;
      color: #F59C00;
    }

    .el-breadcrumb__inner {
      font-family: "宋体";
      color: #333;
      font-size: 12px;
      font-weight: 100 !important;
    }
  }
}
</style>
