<template>
  <!-- 模态框 -->
  <transition name="fade">
    <div class="modal-container" ref="formWrapper" v-show="visible">
    <!-- 新增框title -->
    <div class="title-wrapper">
      <i :class="iconClass" class="modalIcon"></i>
      <h2 class="title">{{modalTitle}}</h2>
      <span class="el-icon-close" @click="closeModal"></span>
    </div>
    <div class="content-wrapper" :style="{height: contentWrapperHeight + 'px'}">
      <div class="fix-wrapper" ref="fixWrapper" v-if="toolShow">
        <!-- 按钮工具组 -->
        <div class="btn-group" ref="btnGroup">
          <el-button size="mini" icon="iconfont ct-icon-save" @click="submitForm('form')">保存</el-button>
        </div>
      </div>
      <!-- 修正fixed之后不能定高的bug -->
      <div class="hack-fixed" v-if="toolShow"></div>
      <!-- tabs表单 -->
      <div class="tabs-wrapper">
        <el-tabs v-model="tabChoosed" type="border-card">
          <el-tab-pane label="基本信息" name="first">
            <div class="form-table-wrapper">
              <el-form :model="formData" :rules="rules" ref="form">
                <table class="form-table" width="100%">
                  <colgroup>
                    <col width="12%"></col>
                    <col width="38%"></col>
                    <col width="12%"></col>
                    <col width="38%"></col>
                  </colgroup>
                  <tr>
                    <th class="title" colspan="4" width="100%">A.养护路段信息卡片</th>
                  </tr>
                  <tr>
                    <th>
                      <span style="color: red;">*</span> 区间路段名称
                    </th>
                    <td colspan="3">
                      <el-form-item label="" prop="regionRoadName">
                        <el-input class="form-input" v-model="formData.regionRoadName" :readonly="readonly" placeholder="请填写区间路段名称"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span style="color: red;">*</span> 养护路段名称
                    </th>
                    <td>
                      <el-form-item label="" prop="protectRoadName">
                        <el-input class="form-input" v-model="formData.protectRoadName" :readonly="readonly" placeholder="请填写养护路段名称"></el-input>
                      </el-form-item>
                    </td>
                    <th>
                      <span style="color: red;">*</span> 养护路段编号
                    </th>
                    <td>
                      <el-form-item label="" prop="protectRoadNum">
                        <el-input class="form-input" v-model="formData.protectRoadNum" :readonly="readonly" placeholder="请填写养护路段编号"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th>长度(km)</th>
                    <td>
                      <el-form-item label="" prop="length">
                        <el-input class="form-input" v-model="formData.length" :readonly="readonly" placeholder="请填写长度"></el-input>
                      </el-form-item>
                    </td>
                    <th>路面均度(m)</th>
                    <td>
                      <el-form-item label="" prop="average">
                        <el-input class="form-input" v-model="formData.average" :readonly="readonly" placeholder="请填写路面均度"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th>折算里程(m)</th>
                    <td>
                      <el-form-item label="" prop="convert">
                        <el-input class="form-input" v-model="formData.convert" :readonly="readonly" placeholder="请填写折算里程"></el-input>
                      </el-form-item>
                    </td>
                    <th>闸道连接线里程(m)</th>
                    <td>
                      <el-form-item label="" prop="connectConvert">
                        <el-input class="form-input" v-model="formData.connectConvert" :readonly="readonly" placeholder="请填写闸道连接线里程"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th>里程起点</th>
                    <td>
                      <el-form-item label="" prop="startPoint">
                        <el-input class="form-input" v-model="formData.startPoint" :readonly="readonly" placeholder="请填写里程起点"></el-input>
                      </el-form-item>
                    </td>
                    <th>里程终点</th>
                    <td>
                      <el-form-item label="" prop="endPoint">
                        <el-input class="form-input" v-model="formData.endPoint" :readonly="readonly" placeholder="请填写里程终点"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th>起点名称</th>
                    <td>
                      <el-form-item label="" prop="startName">
                        <el-input class="form-input" v-model="formData.startName" :readonly="readonly" placeholder="请填写起点名称"></el-input>
                      </el-form-item>
                    </td>
                    <th>终点名称</th>
                    <td>
                      <el-form-item label="" prop="endName">
                        <el-input class="form-input" v-model="formData.endName" :readonly="readonly" placeholder="请填写终点名称"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th>车道类型</th>
                    <td>
                      <el-form-item label="" prop="roadWayType">
                        <el-input class="form-input" v-model="formData.roadWayType" :readonly="readonly" placeholder="请填写车道类型"></el-input>
                      </el-form-item>
                    </td>
                    <th>路面类型</th>
                    <td>
                      <el-form-item label="" prop="roadType">
                        <el-input class="form-input" v-model="formData.roadType" :readonly="readonly" placeholder="请填写路面类型"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th>路基宽度</th>
                    <td>
                      <el-form-item label="" prop="subgradeWidth">
                        <el-input class="form-input" v-model="formData.subgradeWidth" :readonly="readonly" placeholder="请填写路基宽度"></el-input>
                      </el-form-item>
                    </td>
                    <th>设计时速</th>
                    <td>
                      <el-form-item label="" prop="speed">
                        <el-input class="form-input" v-model="formData.speed" :readonly="readonly" placeholder="请填写设计时速"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th>修建年度</th>
                    <td>
                      <el-form-item label="" prop="constructionOfYear">
                        <el-date-picker
                          class="form-input"
                          v-model="formData.constructionOfYear"
                          :readonly="readonly"
                          type="date"
                          placeholder="请选择修建年度">
                        </el-date-picker>
                      </el-form-item>
                    </td>
                    <th>改建年度</th>
                    <td>
                      <el-form-item label="" prop="restructureOfYear">
                        <el-date-picker
                          class="form-input"
                          v-model="formData.restructureOfYear"
                          :readonly="readonly"
                          type="date"
                          placeholder="请选择改建年度">
                        </el-date-picker>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th>最近一次大中修年度</th>
                    <td>
                      <el-form-item label="" prop="restructureOfNearYear">
                        <el-input class="form-input" :readonly="readonly" v-model="formData.restructureOfNearYear" placeholder="请填写最近一次大中修年度"></el-input>
                      </el-form-item>
                    </td>
                    <th>地貌类型</th>
                    <td>
                      <el-form-item label="" prop="geomorphicType">
                        <el-input class="form-input" :readonly="readonly" v-model="formData.geomorphicType" placeholder="请填写地貌类型"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th>方向</th>
                    <td>
                      <el-form-item label="" prop="direction">
                        <el-select class="form-input" v-model="formData.direction" :disabled="readonly" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </td>
                    <th>是否一幅高速</th>
                    <td>
                      <el-form-item label="" prop="hideRate">
                        <el-select class="form-input" v-model="formData.hideRate" :disabled="readonly" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th>技术等级</th>
                    <td>
                      <el-form-item label="" prop="technologyDegree">
                        <el-input class="form-input" :readonly="readonly" v-model="formData.technologyDegree" placeholder="请填写技术等级"></el-input>
                      </el-form-item>
                    </td>
                    <th>政区编码</th>
                    <td>
                      <el-form-item label="" prop="politicalCode">
                        <el-input class="form-input" :readonly="readonly" v-model="formData.politicalCode" placeholder="请填写政区编码"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th>是否移交</th>
                    <td>
                      <el-form-item label="" prop="transfer">
                        <el-select class="form-input" :disabled="readonly" v-model="formData.transfer" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </td>
                    <th>有无中央隔离带</th>
                    <td>
                      <el-form-item label="" prop="isolationBell">
                        <el-select :disabled="readonly" class="form-input" v-model="formData.isolationBell" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th>备注</th>
                    <td colspan="3" height="100">
                      <textarea name="" cols="80" rows="10"></textarea>
                    </td>
                  </tr>
                  <tr>
                    <th>附件</th>
                    <td colspan="3" height="190" class="upload-td">
                      <uploader
                        :btnShow="uploadBtnShow"
                        :delBtnShow="delBtnShow"
                        :btnName="btnName"
                        :fileList="fileList"
                        :params="params"
                        name="files"
                        uploadUrl="/upload/sys/attachment/upload"
                        downloadUrl="/upload/sys/attachment/download"
                        deleteUrl="/upload/sys/attachment/delete"
                        @uploadSuccess="handleUpload"
                        @deleteSuccess="deleteFile"
                      >
                      </uploader>
                    </td>
                  </tr>
                </table>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="路面信息" name="second">路面信息</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import uploader from '@/components/uploader';
export default {
  components: {
    uploader
  },
  props: {
    /* 是否打开模态框，默认不打开 */
    visible: {type: Boolean, default: false},
    // 工具栏和表单的总高度
    contentWrapperHeight: {type: Number, defalut: 0},
    // 模态框的标题的图标class
    iconClass: {type: String, default: ''},
    // 是否显示保存按钮工具栏
    toolShow: {type: Boolean, default: true},
    // 模态框的标题
    modalTitle: {type: String, default: '新增'},
    // 模态框的表单的数据
    formData: {type: Object},
    // 是否只读
    readonly: {type: Boolean, default: false}
  },
  data () {
    const options = [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }];
    return {
      /* 默认选择第一个tab */
      tabChoosed: 'first',
      /* select组件的选项 */
      options: options,
      /* 验证表单规则 */
      rules: {
        regionRoadName: [
          { required: true, message: '请输入区间路段名称', trigger: 'blur' }
        ],
        protectRoadName: [
          { required: true, message: '请输入养护路段名称', trigger: 'change' }
        ],
        protectRoadNum: [
          { required: true, message: '请输入养护路段编号', trigger: 'change' }
        ]
      },
      /* uploader上传组件相关参数 */
      uploadBtnShow: true,
      delBtnShow: true,
      btnName: '上传附件',
      fileList: [],
      params: {
        sessionId: ''
      }
    };
  },

  methods: {
    /* 关闭模态框 */
    closeModal () {
      this.$store.dispatch('toggleModalBgShow', false);
      /* 在父组件中使用了sync双向绑定修饰符，必须加这个方法通知父组件修改visible的值 */
      this.$emit('update:visible', false);
    },
    /* 重置表单 */
    resetModalForm () {
      this.$refs.form.resetFields();
    },
    /**
     * 新增框提交新增文件
     * @author   lvzhiyuan
     * @date     2018/6/1
     * @param    files——将要上传的文件
     */
    handleUpload (files) {
      this.fileList = this.fileList.concat(files);
    },
    /**
     * 删除新增框的文件
     * @author   lvzhiyuan
     * @date     2018/6/1
     * @param    id——将被删除的id
     */
    deleteFile (id) {
      this.fileList.remove(this.fileList.find(item => item.id === id));
    }
  }
};
</script>

<style lang="less" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.modal-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100000;
  background: white;
  box-sizing: border-box;
  padding: 1px;

  .title-wrapper {
    color: white;
    background: dodgerblue;
    height: 32px;
    overflow: hidden;
    line-height: 32px;

    h2.title {
      float: left;
      margin-left: 10px;
      .title;
    }

    .modalIcon {
      float: left;
      margin: 8px 0 0 8px;
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
      width: calc(100% - 338px);
      position: fixed;
      padding-top: 4px;
      z-index: 1000;
      background: white;
      .btn-group {
        padding:0 0 5px 8px;
        border-bottom: 1px solid #ddd;
      }
    }
    /* 修正fixed后的bug */
    .hack-fixed {
      opacity: 0;
      height: 41px;
      z-index: 1;
    }
    .el-tabs--border-card>.el-tabs__content {
      padding : 6px 0 0 5px;
    }

    .upload-td {
      vertical-align: top;
    }
  }
}
</style>
