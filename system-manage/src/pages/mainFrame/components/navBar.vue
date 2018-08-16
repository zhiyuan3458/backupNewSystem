<template>
  <div class="tags-view-container">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <router-link
        ref="tag"
        :to="tag.path"
        class='tags-view-item'
        :class="isActive(tag)? 'active': ''"
        v-for="tag in projectList"
        :key="tag.path"
        @contextmenu.prevent.native="openMenu(tag, $event)"
        @click.native="addNavBarItem(tag.id)"
      >
        {{tag.name}}
      </router-link>
    </scroll-pane>
    <!-- 横竖三点 -->
    <div class="select-project">
      <div class="three-point">
      <div class="project-model">
          <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
            <swiper-slide class="swiper-item" v-for="(swiper, index) in projectListInSwiper" :key="index">
              <ul class="project-lists">
                <router-link
                  tag="li"
                  class="project-list-item"
                  v-for="item in swiper"
                  :key="item.path"
                  :to="item.path"
                  @click.native="addNavBarItem(item.id)"
                >
                  <img :src="require(`@/${item.iconUrl}`)" alt="">
                  <p class="project-name">{{item.name}}</p>
                </router-link>
              </ul>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-prev" slot="button-next"></div>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import { getSubSystemInfo } from '@/api/mainFrame/navBar';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import scrollPane from '@/components/scrollPane/scrollPane.vue';
export default {
  components: {
    scrollPane,
    swiper,
    swiperSlide
  },
  data () {
    return {
      /* 当前子系统的id */
      currentSubsystemId: '',
      /* 各子系统组成的列表 */
      projectList: [],
      /* swiper设置选项 */
      swiperOption: {
        pagination: '.swiper-pagination',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    };
  },

  computed: {
    ...mapGetters([
      'sideBar'
    ]),
    /* 返回由八个子系统为一组的放在swiper容器中的数组 */
    projectListInSwiper () {
      let projectListInSwiper = [];
      const swiperItemSizes = 8;
      let swiperNum = this.projectList.length % swiperItemSizes === 0 ? Math.floor(this.projectList.length / swiperItemSizes) : Math.floor(this.projectList.length / swiperItemSizes) + 1;
      for (let i = 0; i < swiperNum; i++) {
        if (this.projectList.length < swiperItemSizes) {
          projectListInSwiper.push(this.projectList);
        } else {
          let arr = [];
          for (let j = i * swiperItemSizes; j < swiperItemSizes; j++) {
            arr.push(this.projectList[j]);
          }
          projectListInSwiper.push(arr);
        }
      }
      return projectListInSwiper;
    },
    /* swiper实例 */
    swiper () {
      return this.$refs.mySwiper.swiper;
    },
    opened () {
      return this.sideBar.opened;
    }
  },

  watch: {
    // 就是$route: function()简写
    // 监听路由，当子系统变了的话，马上修改sessionStorage和vuex中的子系统id
    $route (to, from) {
      let toSubsystemName = to.path.split('/')[1];
      let fromSubsystemName = from.path.split('/')[1];
      if (fromSubsystemName !== toSubsystemName) {
        let subSystemId = to.meta.subSystemId;
        sessionStorage.setItem('currentSubsystemId', subSystemId);
        this.$store.dispatch('setCurrentSubsystemId', subSystemId);
      }
    }
  },

  methods: {
    /* 点击底导航栏的子系统标签跳转到不同的子系统中 */
    addNavBarItem (subSystemId) {
      this.$store.dispatch('setCurrentSubsystemId', subSystemId);
      sessionStorage.setItem('currentSubsystemId', subSystemId);
    },
    // 判断传值进来的路由的子系统id是否与当前路由对象的meta的subSystemId相同
    isActive (route) {
      return this.$route.meta.subSystemId === route.id;
    }
  },
  created () {
    // this.$store.dispatch('getSubsystemInfo');
    /* 获取子系统的信息并渲染到页面中 */
    /* 之所以要用sessionStorage和vuex一起把当前子系统id记住是因为f5刷新页面后就会清除所有vuex数据 */
    getSubSystemInfo().then(res => {
      let code = res.data.code;
      if (code === this.ERR_OK) {
        this.projectList = res.data.data;
        /* 把当前的子系统id提交到vuex和sessionStorage中 */
        if (sessionStorage.getItem('currentSubsystemId') !== null) {
          console.log(sessionStorage.getItem('currentSubsystemId'));
          let currentSubsystemId = sessionStorage.getItem('currentSubsystemId');
          this.$store.dispatch('setCurrentSubsystemId', currentSubsystemId);
        } else {
          sessionStorage.setItem('currentSubsystemId', this.projectList[0].id);
          this.$store.dispatch('setCurrentSubsystemId', this.projectList[0].id);
        }
      }
    });
  }
};
</script>

<style lang="less" scoped>
@import "../less/mainFrame.less";
.tags-view-container {
  position: relative;
  .tags-view-wrapper {
    background: #fff;
    box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, .12);
    .tags-view-item {
      text-decoration: none!important;
      display: inline-block;
      position: relative;
      height: 24px;
      line-height: 24px;
      /*border: 1px solid #d8dce5;*/
      color: white;
      background: #34495E;
      padding: 0 8px;
      margin-left: 5px;
      /*margin-top: 1px;*/
      border-radius: 3px;
      .nav-bar-item;
      &:last-of-type {
        margin-right: 28px;
      }
      &.active {
        background-color: #2196f3;
        color: #fff;
        border-color: #2196f3;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  /*  横竖三点 */
  .select-project {
    height: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 6px 5px 0 5px;
    box-sizing: border-box;
    cursor: pointer;
    &:before {
      content: '';
      height: 80%;
      position: absolute;
      top: 1px;
      left: -2px;
      border-left: 1px solid #ddd;
    }

    &:hover {
      background: #282828;
      border: 1px solid orange;
      border-top: 0;
    }

    .three-point {
      width: 25px;
      height: 5px;
      margin-top: 5px;
      background: url('../img/blackPoint.png') no-repeat;

      .project-model {
        width: 600px;
        height: 300px;
        visibility: hidden;
        z-index: -1;
        position: absolute;
        top: -299px;
        right: -1px;
        padding: 15px;
        box-sizing: border-box;
        background: white;
        border: 1px solid orange;
        cursor: default;

        .swiper-container {
          height: 100%;
          .project-lists {
            overflow: hidden;
            .project-list-item {
              float: left;
              text-align: center;
              padding: 10px;
              cursor: pointer;

              .project-name {
                margin-top: -10px;
              }
            }
          }
        }
      }
    }

    &:hover .project-model {
      visibility: visible;
    }

    &:hover .three-point {
      background: url('../img/whitePoint.png') no-repeat;
    }
  }
}
</style>
