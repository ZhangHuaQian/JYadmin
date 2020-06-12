<template>
  <el-form ref="form" :model="form" :rules="rules" :disabled="isSelect" label-width="120px">
    <el-form-item label="站点ID" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="站点标题" prop="manager">
      <el-input v-model="form.manager" />
    </el-form-item>
    <el-form-item label="站点logo" prop="manager" style="text-align: left;">
      <imageUpload :form-image="form.image" @getImage="getLogo" />
    </el-form-item>
    <el-form-item label="站点模板" style="text-align: left;">
      <el-select v-model="form.pId" placeholder="请选择" style="width: 50%;">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="站点描述">
      <el-input
        v-model="form.decription"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 8}"
        placeholder="请输入内容"
      />
    </el-form-item>
    <el-form-item label="站点页面背景" prop="manager" style="text-align: left;">
      <imageUpload :form-image="form.bg" @getImage="getBG" />
    </el-form-item>
    <el-form-item label="站点域名" prop="manager">
      <el-input v-model="form.tel" />
    </el-form-item>
    <el-form-item label="访问目录" prop="manager">
      <el-input v-model="form.tel" />
    </el-form-item>
    <el-form-item label="版权信息" prop="manager">
      <el-input v-model="form.tel" />
    </el-form-item>
    <el-form-item label="底部内容">
      <el-input
        v-model="form.decription"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 8}"
        placeholder="请输入内容"
      />
    </el-form-item>
    <el-form-item v-if="!isSelect" style="text-align: left;">
      <el-button type="primary" @click="onSubmit">确认</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import imageUpload from '@/components/upload/image'
import { getList } from '@/api/request'
export default {
  components: {
    imageUpload
  },
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
      form: {},
      rules: {
        name: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        statsNo: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        manager: [{ required: true, message: '请填写内容', trigger: 'blur' }]
      },
      options: []
    }
  },
  mounted() {
    if (this.getform) {
      this.form = this.getform
    }
    this.getOptionsList()
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('onSubmit', this.form)
        } else {
          this.$message('有内容没有填写！')
        }
      })
    },
    getOptionsList() {
      const data = {
        openPage: 0
      }
      getList('/sys/upms/department', data).then(response => {
        const results = response.data
        this.options = results.data
      })
    },
    getLogo(url) {
      this.form.image = url
    },
    getBG(url) {
      this.form.bg = url
    },
    onCancel() {
      this.$emit('onClose')
    }
  }
}
</script>

<style scoped>

</style>
