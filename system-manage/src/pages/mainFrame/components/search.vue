<template>
  <transition name="el-fade-in-linear">
    <div
      v-if="show"
      class="search-modal"
    >
      <div class="close" @click.stop="handleClose">
        <span class="ct-icon-remove1"></span>
      </div>
      <div class="search-content-wrapper">
        <ul class="search-content-ul search-left-wrapper">
          <li class="search-item">
            <h3>
              <a class="favurl" href="">2015年项目
                <em>大中小修</em>项目
              </a>
            </h3>
            <p>
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
            </p>
          </li>
          <li class="search-item">
            <h3>
              <a class="favurl" href="">2015年项目
                <em>大中小修</em>项目
              </a>
            </h3>
            <p>
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
            </p>
          </li>
          <li class="search-item">
            <h3>
              <a class="favurl" href="">2015年项目
                <em>大中小修</em>项目
              </a>
            </h3>
            <p>
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
            </p>
          </li>
        </ul>
        <div class="shuxian"></div>
        <ul class="search-content-ul search-right-wrapper">
          <li class="search-item">
           <h3>
             <a class="favurl" href="">2015年项目
               <em>大中小修</em>项目
             </a>
           </h3>
            <p>
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
            </p>
          </li>
          <li class="search-item">
            <h3>
              <a class="favurl" href="">2015年项目
                <em>大中小修</em>项目
              </a>
            </h3>
            <p>
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
            </p>
          </li>
          <li class="search-item">
            <h3>
              <a class="favurl" href="">2015年项目
                <em>大中小修</em>项目
              </a>
            </h3>
            <p>
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
              项目进度修复完善，但还有一小部分细节还需要继续努力构建...
            </p>
          </li>
        </ul>
      </div>
      <el-pagination
        class="search-pagination"
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    modelHeight () {
      return document.body.offsetHeight - 47 - 32;
    }
  },
  mounted () {
    document.body.appendChild(this.$el);
  },
  methods: {
    handleClose () {
      this.$emit('update:show', false);
    }
  }
};
</script>

<style lang="less" scoped>
.search-modal {
  width: calc(100% - 43px);
  height: calc(100% - 76px);
  background: white;
  position: absolute;
  top: 47px;
  left: 43px;
  z-index: 100;

  .close {
    float: right;
    padding: 10px;
    cursor: pointer;
    transition: all .5s;
    .ct-icon-remove1 {
      font-size: 16px;
      color: #333;
    }
    &:hover {
      background: #bbb;
      .ct-icon-remove1 {
        color: white;
      }
    }
  }

  .search-content-wrapper {
    height: 95%;
    display: flex;
    justify-content: space-around;

    .search-content-ul {
      width: 48%;
      padding-top: 20px;

      .search-item {
        margin-bottom: 14px;
        h3 {
          font-weight: 400;
          font-size: large;
          margin-bottom: 1px;

          a.favurl {
            color: #0000CC;
            text-decoration: underline;

            em {
              color: #c00;
            }
          }
        }
        p {
          line-height: 1.54;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
    }

    .shuxian {
      width: 1px;
      height: 98%;
      background: #ccc;
      margin-top: 5px;
    }
  }
  .search-pagination {
    text-align: center;
  }
}
</style>
