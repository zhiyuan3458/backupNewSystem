<template>
  <div class="upload">
    <!-- 上传按钮 -->
    <div class="btns" v-if="btnShow">
      <i class="ct-icon-add2"></i>
      <label class="upload-btn" :for="fileId">{{btnName}}</label>
      <input
        :id="fileId"
        :accept="accept"
        type="file"
        ref="input"
        :name="name"
        multiple
        style="position:absolute;clip:rect(0 0 0 0);"
        @change="handleUpload($event)">
    </div>
    <!-- 上传列表 -->
    <div class="vinSwfUpload_context_editContent">
      <div id="thelist" class="uploader-list" :style="{width: thelistWidth + 'px'}">
      <div v-for="item in fileList" class="file-item" :key="item.id">
        <div class="file_name" :title="item.originalFileName">
          <a v-if="/\bpng\b|\bjpg\b|\bjpeg\b|\bgif\b/.test(item.fileType)" class="imgPreview" :id="item.id" :title="item.originalFileName" @click="enlargeThumb(item.id)">
            <img class="thumb" :src="'http://192.1.80.184/' + item.groupNode + '/' + item.filePath" alt="">
          </a>
          <a v-else-if="/\bdoc\b|\bdocx\b/.test(item.fileType)" class="imgPreview" :id="item.id" :title="item.originalFileName">
            <img class="thumb" src="./word_alt_1.png" alt="">
          </a>
          <a v-else-if="/\bxlsx\b|\bxls\b|\bxlsm\b|\bxlsb\b/.test(item.fileType)" class="imgPreview" :id="item.id" :title="item.originalFileName">
            <img class="thumb" src="./excel_alt_1.png" alt="">
          </a>
          <a v-else-if="/\bppt\b|\bpptx\b|\bpptm\b/.test(item.fileType)" class="imgPreview" :id="item.id" :title="item.originalFileName">
            <img class="thumb" src="./powerpoint_alt_1.png" alt="">
          </a>
          <a v-else-if="/\btxt\b/.test(item.fileType)" class="imgPreview" :id="item.id" :title="item.originalFileName">
            <img class="thumb" src="./txt_icon.png" alt="">
          </a>
          <a v-else class="imgPreview" :id="item.id" :title="item.originalFileName">
            <img class="thumb" src="./attachment-green.png" alt="">
          </a>
          <p class="fname" :title="item.originalFileName">{{item.originalFileName}}</p>
          <div class="file_operation">
            <i title="下载" class="el-icon-download" @click="downloadFile(item.id)"></i>
            <i title="删除" v-if="delBtnShow" class="el-icon-close" @click="deleteFile(item.id)"></i>
          </div>
        </div>
      </div>
  </div>
    </div>
    <el-carousel class="carousel-wrapper" ref="carousel" height="500px" indicator-position="outside" v-show="carouselShow" :autoplay="false">
      <span class="el-icon-close" @click="carouselShow = false"></span>
      <el-carousel-item class="carousel-item" v-for="item in imgList" :key="item.id">
        <img :src="'http://192.1.80.184/' + item.groupNode + '/' + item.filePath" alt="">
      </el-carousel-item>
    </el-carousel>
</div>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      fileId: '',
      carouselShow: false
    };
  },
  props: {
    /* input的id */
    id: {
      type: String,
      default: ''
    },
    /* 是否显示上传按钮 */
    btnShow: {
      type: Boolean,
      default: true
    },
    btnName: {
      type: String,
      default: '上传文件'
    },
    /* 是否显示删除图标 */
    delBtnShow: {
      type: Boolean,
      default: true
    },
    /* 上传的文件列表 */
    fileList: {
      type: Array
    },
    /* 上传地址 */
    uploadUrl: {
      type: String,
      require: true
    },
    /* 下载地址 */
    downloadUrl: {
      type: String
    },
    /* 删除地址 */
    deleteUrl: {
      type: String
    },
    /* 上传文件的字段名 */
    name: {
      type: String,
      require: true,
      default: 'file'
    },
    /* 上传文件的附带其他参数 */
    params: {
      type: Object
    },
    /* 是否允许多文件上传 */
    multiple: {
      type: Boolean,
      default: true
    },
    /* 文件上传的类型 */
    accept: {
      type: String
    }
  },
  computed: {
    thelistWidth () {
      if (this.fileList) {
        return 133 * this.fileList.length;
      }
    },
    imgList () {
      return this.fileList.filter(item => /\bpng\b|\bjpg\b|\bjpeg\b|\bgif\b/.test(item.fileType));
    }
  },
  mounted () {
    // 给每个input生成一个id
    this.fileId = this.id || this.gengerateID();
  },
  methods: {
    // 指定input type为file的id
    gengerateID () {
      let nonstr = Math.random().toString(36).substring(3, 8);
      if (!document.getElementById(nonstr)) {
        return nonstr;
      } else {
        return this.gengerateID();
      }
    },
    // 上传事件
    handleUpload (e) {
      let fileObj = e.target.files;
      const config = { 'Content-Type': 'multipart/form-data' };
      if (e.target.files.length !== 0) {
        const loading = this.$loading({
          lock: true,
          text: '上传中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let files = new FormData();
        for (let i = 0; i < fileObj.length; i++) {
          files.append('files', fileObj[i]);
        }
        let postFiles = Array.prototype.slice.call(fileObj);
        if (!this.multiple) {
          postFiles = postFiles.slice(0, 1);
        }
        if (this.params) {
          Object.keys(this.params).forEach(item => {
            files.append(item, this.params[item]);
          });
        }
        this.$axios.post(this.uploadUrl, files, config).then(res => {
          loading.close();
          let code = res.data.code;
          if (code === this.ERR_OK) {
            this.$message({
              type: 'success',
              message: '文件上传成功!',
              duration: 1000
            });
            this.$emit('uploadSuccess', res.data.data);
          } else {
            this.$message({
              type: 'info',
              message: '上传失败，请重新删除!',
              duration: 1000
            });
            this.$emit('uploadError', res);
          }
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '上传失败，请重新删除!',
            duration: 1000
          });
          this.$emit('uploadError', err);
        });
      }
      // this.$refs.input.value = null;
    },
    // 下载事件
    downloadFile (id) {
      window.open(`${this.downloadUrl}?id=${id}`);
    },
    // 删除事件
    deleteFile (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete(`${this.deleteUrl}?id=${id}`).then(res => {
          let code = res.data.code;
          if (code === this.ERR_OK) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              duration: 1000
            });
            this.$emit('deleteSuccess', id);
          } else {
            this.$message({
              type: 'info',
              message: '删除失败，请重新删除操作！',
              duration: 1000
            });
            this.$emit('deleteError');
          }
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '删除失败，请重新删除操作！',
            duration: 1000
          });
          this.$emit('deleteError', err);
        });
      });
    },
    setActiveItem (index) {
      this.$refs.carousel.setActiveItem(index);
    },
    enlargeThumb (id) {
      this.carouselShow = true;
      let imgActiveIndex = this.imgList.indexOf(this.imgList.find(item => item.id === id));
      this.setActiveItem(imgActiveIndex);
    }
  }
};
</script>

<style lang="less">
@import "../../common/less/theme";
.upload {
  .btns {
    position: relative;
    .ct-icon-add2 {
      position: absolute;
      top: 13px;
      left: 11px;
      font-size: 14px;
      color: forestgreen;
    }
    .upload-btn {
      width: 70px;
      height: 20px;
      text-align: right;
      display: inline-block;
      line-height: 20px;
      padding: 10px;
      cursor: pointer;
    }
  }

  .vinSwfUpload_context_editContent {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    #thelist {
      overflow: hidden;
      .file-item {
        width: 123px;
        height: 106px;
        display: inline-table;
        overflow: hidden;
        border: #cccccc 1px solid;
        margin: 3px;
        position: relative;
        float: left;

        .file_name {
          float: left;
          text-align: left;
          margin-left: 2px;
          margin-top: 2px;

          .imgPreview {
            width: 100px;
            height: 80px;
            overflow: hidden;
            display: inline-block;
            text-decoration: none;
            outline: none;
            color: #333;
            cursor: pointer;

            .thumb {
              width: 60px;
              height: 60px;
              vertical-align: middle;
              border: 0;
            }
          }
          .fname {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 123px;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            overflow: hidden;
            z-index: 10;
            margin-bottom: 5px;
            .content;
          }
          .file_operation {
            width: 16px;
            position: absolute;
            right: 2px;
            float: left;
            top: 2px;

            i.el-icon-download {
              text-decoration: none;
              color: #56C387;
              cursor: pointer;
            }

            i.el-icon-close {
              text-decoration: none;
              color: #C23A26;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .carousel-wrapper {
    width: 1000px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    background: rgba(153, 153, 153, 0.4);
    z-index: 100;
    .el-icon-close {
      position: fixed;
      top: 5px;
      right: 5px;
      color: red;
      cursor: pointer;
      z-index: 101;
      font-size: 20px;
      font-weight: 700;
    }
    .el-carousel__arrow {
      background: rgba(7, 17, 27, 0.7);
    }
    .carousel-item {
      text-align: center;
      img {
        max-width: 500px;
        height: auto;
        margin-top: 100px;
      }
    }
  }
}
</style>
