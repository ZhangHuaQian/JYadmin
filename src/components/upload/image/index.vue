<template>
  <el-upload
    class="image-uploader"
    :action="ip"
    accept=".jpg,.jpeg,.JPG,.JPEG,.png,.PNG"
    :show-file-list="false"
    :on-success="onImageSuccess"
    :before-upload="beforeImageUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="image banner">
    <i v-else class="el-icon-plus image-uploader-icon" />
  </el-upload>
</template>

<script>
import { ip4Img } from '@/api/upload.js'
import { serverip } from '@/utils/serverIP'
export default {
  props: {
    geturl: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      imageUrl:this.geturl,
      ip: ip4Img,
      serverip: serverip
    }
  },
  watch:{
    geturl(val){
      if(val){
        this.imageUrl=val
      }
    }
  },
  created() {
    if (this.geturl) {
      this.imageUrl =  this.geturl
    }
  },
  methods: {
    onImageSuccess(res, file, fileList) {
      this.$message.success(res.msg)
      this.imageUrl = res.src
      this.$emit('getImage', this.imageUrl)
    },
    beforeImageUpload(file) {
      const isIMG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt25M = file.size / 1024 / 1024 < 25
      if (!isIMG) {
        this.$message.error('上传封面图片只能是图片格式!')
      }
      if (!isLt25M) {
        this.$message.error('上传封面图片大小不能超过 25MB!')
      }
      return isIMG && isLt25M
    }
  }
}
</script>

<style scoped>
  .image-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .image-uploader /deep/ .el-upload:hover {
    border-color: #409EFF;
  }
  .image-uploader /deep/ .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 180px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .image {
    width: 178px;
    height: 178px;
    display: block;
  }
  .banner{
    width: 80%;
  }
</style>
