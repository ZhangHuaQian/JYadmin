<template>
  <el-form ref="form" :model="form" :rules="rules" :disabled="isSelect" label-width="120px">
    <el-form-item label="类型名称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="简介">
      <el-input
        v-model="form.introduce"
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
      form: {},
      rules: {
        name: [{ required: true, message: '请填写内容', trigger: 'blur' }]
      }
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
          this.$emit('onSubmit', this.form)
        } else {
          this.$message('有内容没有填写！')
        }
      })
    },
    onCancel() {
      this.$emit('onClose')
    }
  }
}
</script>

<style scoped>

</style>
