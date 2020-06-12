<template>
  <el-form ref="form" :model="form" :rules="rules" :disabled="isSelect" label-width="120px">
    <el-form-item label="姓名" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="登录账号" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="登录密码" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="角色" prop="title" style="text-align: left;">
      <el-select v-model="form.title" placeholder="请选择" style="width: 50%;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="上级部门" prop="title" style="text-align: left;">
      <el-select v-model="form.title" placeholder="请选择" style="width: 50%;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="联系方式" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item v-if="!isSelect" style="text-align: left;">
      <el-button type="primary" @click="onSubmit">确认</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ip } from '@/api/upload.js'
export default {
  props: {
    getform: {
      type: Object,
      default: null
    },
    isSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ip: ip,
      form: {
        title: '',
        content: '',
        files: []
      },
      rules: {
        title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
        content: [{ required: true, message: '请填写内容', trigger: 'blur' }]
      },
      options: [{
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
      }]
    }
  },
  mounted() {
    if (this.getform) {
      this.form = this.getform
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const filelist = this.form.files
          for (var i = 0; i < filelist.length; i++) {
            if (filelist[i].response) {
              this.form.files[i] = filelist[i].response.data
            } else {
              const arr = Object.keys(filelist[i])
              for (let j = 0; j < arr.length; j++) {
                if (arr[j] !== 'fileName' && arr[j] !== 'name' && arr[j] !== 'url') {
                  delete this.form.files[i][arr[j]]
                }
              }
            }
            delete this.form.files[i].createTime
            delete this.form.files[i].modifyTime
          }
          console.log(this.form)
          this.$emit('onSubmit', this.form)
        } else {
          this.$message('有内容没有填写！')
        }
      })
    },
    onCancel() {
      this.$emit('onClose')
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt20M = file.size / 1024 / 1024 < 20

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt20M) {
        this.$message.error('上传头像图片大小不能超过 20MB!')
      }
      return isJPG && isLt20M
    }
  }
}
</script>

<style scoped>
    .avatar-uploader /deep/ .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader /deep/ .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .avatar {
      width: 120px;
      height: 150px;
      display: block;
    }
</style>
