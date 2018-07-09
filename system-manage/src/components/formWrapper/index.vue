<template>
<div class="form-container">
  <h2 class="title">{{title}}</h2>
  <div class="lzy-main-content">
    <slot name="form"></slot>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="less">
  /* 表单 */
.form-container {
  border: 1px solid orange;
  border-radius: 5px;
  margin: 10px 5px;
  position: relative;

  .title {
    line-height: 20px;
    background: white;
    color: #333;
    position: absolute;
    top: -15px;
    left: 15px;
    padding: 5px;
  }
  .lzy-main-content {
    width: 98%;
    text-align: left;
    padding: 20px 10px 10px 20px;
    box-sizing: border-box;
    margin: 0 auto;
    margin-top: 5px;
  }
}
</style>
