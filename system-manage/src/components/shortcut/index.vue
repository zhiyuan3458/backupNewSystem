<template>
  <div class="shortcut-box">
    <div class="shortcut-box-header">
      <i :class="iconClass" class="icon"></i>
      <span>{{header}}</span>
      <div class="notice-board-suffix">
          <el-switch
            v-model="isOpen"
            class="switch"
          >
          </el-switch>
      </div>
    </div>
    <div class="shortcut-box-content">
      <!--<ul class="shortcut-group">-->
        <draggable v-model="shortcuts" element="ul" class="shortcut-group">
          <transition-group>
            <li v-for="(shortcut, index) in shortcuts" class="shortcut" :key="index" :title="shortcut.name">
              <span v-if="isOpen" class="remove ct-icon-remove4" @click="handleDeleteShortcut(shortcut.id)"></span>
              <router-link tag="span" :to="shortcut.path">
                <span :class="shortcut.iconUrl" class="shortcut-icon"></span>
                <span class="shortcut-name">{{shortcut.name.length > 4 ? shortcut.name.slice(0,4) + '...' : shortcut.name}}</span>
              </router-link>
            </li>
          </transition-group>
        </draggable>
      <!--</ul>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import draggable from 'vuedraggable';
export default {
  name: 'shortcut',
  components: {
    draggable
  },
  data () {
    return {
      // 默认switch按钮不打开
      isOpen: false
    };
  },
  props: {
    header: String,
    content: Array,
    iconClass: String,
    shortcuts: Array
  },
  methods: {
    handleDeleteShortcut (id) {
      if (id) {
        this.$emit('deleteShortcut', id);
      }
    }
  }
};
</script>

<style lang="less">
@import "../../common/less/base.less";

.shortcut-box {
  width: 100%;
  height: 240px;
  box-sizing: border-box;
  padding: 10px 8px;
  border: 1px solid #EAEAEA;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;

  .shortcut-box-header {
    padding-bottom: 10px;
    box-sizing: border-box;
    .border-px(1px, rgba(7,17,27,0.1));
    font-family: 'Adobe 黑体 Std R';
    font-weight: 700;
    overflow: hidden;

    .icon {
      color: #6B6B6B;
      font-size: 16px;
    }
    .notice-board-suffix {
      float: right;
    }
  }

  .shortcut-box-content {
    .shortcut-group {
      overflow: hidden;
      li.shortcut {
        position: relative;
        padding: 8px;
        line-height: 24px;
        float: left;
        text-align: center;
        cursor: pointer;

        .remove {
          position: absolute;
          top: 0;
          right: 0;
        }

        .shortcut-icon {
          font-size: 22px;
          display: block;
          background-repeat: no-repeat;
          margin: 0 auto;
        }
        .shortcut-name {
          text-decoration: none;
          .content;
          color: #333;
        }
      }
    }
  }
}
</style>
