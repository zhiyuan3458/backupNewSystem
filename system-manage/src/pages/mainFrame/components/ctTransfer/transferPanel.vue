<template>
  <div class="el-transfer-panel">
    <p class="el-transfer-panel__header">
      <el-checkbox
        v-model="allChecked"
        @change="handleAllCheckedChange"
        :indeterminate="isIndeterminate">
        {{ title }}
        <span>{{ checkedSummary }}</span>
      </el-checkbox>
    </p>

    <div :class="['el-transfer-panel__body', hasFooter ? 'is-with-footer' : '']">
      <el-input
        class="el-transfer-panel__filter"
        v-model="query"
        size="small"
        :placeholder="placeholder"
        @mouseenter.native="inputHover = true"
        @mouseleave.native="inputHover = false"
        v-if="filterable">
        <i slot="prefix"
           :class="['el-input__icon', 'el-icon-' + inputIcon]"
           @click="clearQuery"
        ></i>
      </el-input>
      <el-checkbox-group
        v-model="checked"
        v-show="!hasNoMatch && data.length > 0"
        :class="{ 'is-filterable': filterable }"
        class="el-transfer-panel__list">
        <draggable v-model="initData" @end="handleDragEnd">
          <div class="check-box-wrapper" v-for="(item, index) in filteredData" :key="index">
            <el-checkbox
              class="el-transfer-panel__item"
              :label="item[keyProp]"
              :disabled="item[disabledProp]"
              :key="item[keyProp]"
            >
              <option-content :option="item"></option-content>
            </el-checkbox>
            <span v-if="iconShow" class="ct-icon-setting2" @click.self="handleClickSetting(item)"></span>
          </div>
        </draggable>
      </el-checkbox-group>
      <p
        class="el-transfer-panel__empty"
        v-show="hasNoMatch">{{ t('el.transfer.noMatch') }}</p>
      <p
        class="el-transfer-panel__empty"
        v-show="data.length === 0 && !hasNoMatch">{{ t('el.transfer.noData') }}</p>
    </div>
    <el-dialog
      title="编辑图表信息"
      :visible.sync="innerDialogVisible"
      width="380px"
      append-to-body
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="表名">
          <el-input class="desk-setting-input" v-model="form.chartTitle" placeholder="请填写图标名字"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-select v-model="form.model" placeholder="请选择图表规格">
            <el-option
              v-for="option in options"
              :key="option.value"
              :label="option.label"
              :value="option.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="handleSave">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import ElCheckboxGroup from 'element-ui/packages/checkbox-group';
import ElCheckbox from 'element-ui/packages/checkbox';
import ElInput from 'element-ui/packages/input';
import Locale from 'element-ui/src/mixins/locale';
import draggable from 'vuedraggable';
import { saveDeskSetting, saveChartInfo } from '@/api/mainFrame/header';
import { mapGetters } from 'vuex';

export default {
  mixins: [Locale],

  name: 'ElTransferPanel',

  componentName: 'ElTransferPanel',

  components: {
    ElCheckboxGroup,
    ElCheckbox,
    ElInput,
    draggable,
    OptionContent: {
      props: {
        option: Object
      },
      render (h) {
        const getParent = vm => {
          if (vm.$options.componentName === 'ElTransferPanel') {
            return vm;
          } else if (vm.$parent) {
            return getParent(vm.$parent);
          } else {
            return vm;
          }
        };
        const panel = getParent(this);
        const transfer = panel.$parent || panel;
        return panel.renderContent
          ? panel.renderContent(h, this.option)
          : transfer.$scopedSlots.default
            ? transfer.$scopedSlots.default({ option: this.option })
            : <span>{ this.option[panel.labelProp] || this.option[panel.keyProp] }</span>;
      }
    }
  },

  props: {
    iconShow: false,
    data: {
      type: Array,
      default () {
        return [];
      }
    },
    renderContent: Function,
    placeholder: String,
    title: String,
    filterable: Boolean,
    format: Object,
    filterMethod: Function,
    defaultChecked: Array,
    props: Object
  },

  data () {
    return {
      initData: this.data,
      checked: [],
      allChecked: false,
      query: '',
      inputHover: false,
      checkChangeByUser: true,
      innerDialogVisible: false,
      /* 内嵌框的表名与规格 */
      options: [
        {
          value: '11',
          label: '1*1'
        },
        {
          value: '21',
          label: '2*1'
        }
      ],
      form: {
        chartTitle: '',
        model: '11'
      }
    };
  },

  watch: {
    checked (val, oldVal) {
      this.updateAllChecked();
      if (this.checkChangeByUser) {
        const movedKeys = val.concat(oldVal)
          .filter(v => val.indexOf(v) === -1 || oldVal.indexOf(v) === -1);
        this.$emit('checked-change', val, movedKeys);
      } else {
        this.$emit('checked-change', val);
        this.checkChangeByUser = true;
      }
    },

    data () {
      this.initData = this.data;
      const checked = [];
      const filteredDataKeys = this.filteredData.map(item => item[this.keyProp]);
      this.checked.forEach(item => {
        if (filteredDataKeys.indexOf(item) > -1) {
          checked.push(item);
        }
      });
      this.checkChangeByUser = false;
      this.checked = checked;
    },

    checkableData () {
      this.updateAllChecked();
    },

    defaultChecked: {
      immediate: true,
      handler (val, oldVal) {
        if (oldVal && val.length === oldVal.length &&
          val.every(item => oldVal.indexOf(item) > -1)) return;
        const checked = [];
        const checkableDataKeys = this.checkableData.map(item => item[this.keyProp]);
        val.forEach(item => {
          if (checkableDataKeys.indexOf(item) > -1) {
            checked.push(item);
          }
        });
        this.checkChangeByUser = false;
        this.checked = checked;
      }
    }
  },

  computed: {
    ...mapGetters([
      'initEcharts'
    ]),
    filteredData () {
      return this.initData.filter(item => {
        if (typeof this.filterMethod === 'function') {
          return this.filterMethod(this.query, item);
        } else {
          const label = item[this.labelProp] || item[this.keyProp].toString();
          return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }
      });
    },

    checkableData () {
      return this.filteredData.filter(item => !item[this.disabledProp]);
    },

    checkedSummary () {
      const checkedLength = this.checked.length;
      const dataLength = this.data.length;
      const { noChecked, hasChecked } = this.format;
      if (noChecked && hasChecked) {
        return checkedLength > 0
          ? hasChecked.replace(/\${checked}/g, checkedLength).replace(/\${total}/g, dataLength)
          : noChecked.replace(/\${total}/g, dataLength);
      } else {
        return `${checkedLength} / ${dataLength}`;
      }
    },

    isIndeterminate () {
      const checkedLength = this.checked.length;
      return checkedLength > 0 && checkedLength < this.checkableData.length;
    },

    hasNoMatch () {
      return this.query.length > 0 && this.filteredData.length === 0;
    },

    inputIcon () {
      return this.query.length > 0 && this.inputHover
        ? 'circle-close'
        : 'search';
    },

    labelProp () {
      return this.props.label || 'label';
    },

    keyProp () {
      return this.props.key || 'key';
    },

    disabledProp () {
      return this.props.disabled || 'disabled';
    },

    hasFooter () {
      return !!this.$slots.default;
    }
  },

  methods: {
    handleDragEnd (e) {
      if (e.newIndex !== e.oldIndex) {
        console.log('this.initData');
        console.log(this.initData);
        let ids = this.initData.map(item => item.id).join(',');
        saveDeskSetting(ids).then(res => {
          console.log(res);
          let code = res.data.code;
          if (code === this.ERR_OK) {
            this.$store.dispatch('getDeskSetting');
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
          } else {
            this.$message({
              message: '拖拽不成功，请重新刷新页面再操作！',
              type: 'info'
            });
          }
        });
      }
    },
    handleClickSetting (option) {
      this.innerDialogVisible = true;
      let chart = this.initEcharts.find(item => item.id === option.id);
      this.form.chartTitle = chart.title;
      this.form.id = chart.id;
      this.form.model = chart.model;
    },

    handleSave () {
      let chartInfo = {
        layoutId: this.form.id,
        title: this.form.chartTitle,
        model: this.form.model
      };
      saveChartInfo(chartInfo).then(res => {
        let code = res.data.code;
        if (code === this.ERR_OK) {
          this.$store.dispatch('getDeskSetting');
          this.$message({
            message: '编辑成功！',
            type: 'success'
          });
          this.innerDialogVisible = false;
        } else {
          this.$message({
            message: '编辑失败，请重新刷新页面再编辑！',
            type: 'info'
          });
        }
      });
    },

    updateAllChecked () {
      const checkableDataKeys = this.checkableData.map(item => item[this.keyProp]);
      this.allChecked = checkableDataKeys.length > 0 &&
        checkableDataKeys.every(item => this.checked.indexOf(item) > -1);
    },

    handleAllCheckedChange (value) {
      this.checked = value
        ? this.checkableData.map(item => item[this.keyProp])
        : [];
    },

    clearQuery () {
      if (this.inputIcon === 'circle-close') {
        this.query = '';
      }
    }
  }
};
</script>

<style lang="less" scoped>
.check-box-wrapper {
  position: relative;

  .el-transfer-panel__item {
    display: inline-block;
  }
  .ct-icon-setting2 {
    float: right;
    line-height: 30px;
    margin-right: 20px;
    cursor: pointer;

    &:hover {
      color: #409EFF;
    }
  }
}
.desk-setting-input {
  width: 217px;
  margin-bottom: 15px;
}
</style>
