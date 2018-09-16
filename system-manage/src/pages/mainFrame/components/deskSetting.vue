<template>
<el-dialog width="650px" title="自定义桌面设置" :visible.sync="deskSettingShow" :before-close="handleClose">
  <ctTransfer
    v-model="target"
    :props="{
      key: 'id',
      label: 'title'
    }"
    :titles="['未选中的图表', '已选中的图表']"
    :data="source"
    @change="handleSave"
  >
    <span slot-scope="{ option }">
      <span>{{option.title.length > 8 ? option.title.substring(0,8) + '...' : option.title}}</span>
    </span>
  </ctTransfer>
</el-dialog>
</template>

<script type="text/ecmascript-6">
import ctTransfer from '@/pages/mainFrame/components/ctTransfer/index.vue';
import { saveDeskSetting } from '@/api/mainFrame/header';
import { mapGetters } from 'vuex';

export default {
  name: 'deskSetting',
  components: {
    ctTransfer
  },
  data () {
    return {
      source: [],
      target: [],
      chartTitle: '',
      size: ''
    };
  },
  watch: {
    initEcharts () {
      this.source = this.initEcharts.map(echart => {
        return {
          id: echart.id,
          title: echart.title
        };
      });
      this.target = this.initEcharts.filter(item => item.isTarget === '1').map(echart => echart.id);
    }
  },
  props: {
    deskSettingShow: Boolean
  },
  computed: {
    ...mapGetters([
      'initEcharts',
      'innerDialogVisible'
    ])
  },
  methods: {
    /**
     * 点击取消按钮后后关闭模态框
     * @author   lvzhiyuan
     * @date     2018/8/21
     */
    handleClose () {
      this.$emit('update:deskSettingShow', false);
    },
    /**
     * 保存后关闭模态框
     * @author   lvzhiyuan
     * @date     2018/8/21
     */
    handleSave (initIds) {
      let ids = initIds.join(',');
      saveDeskSetting(ids).then(res => {
        let code = res.data.code;
        // console.log(res.data.data);
        if (code === this.ERR_OK) {
          this.$store.dispatch('getDeskSetting');
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
        } else {
          this.$message({
            message: '保存失败，请重新操作！',
            type: 'info'
          });
        }
      });
    }
  }
};
</script>
