<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="字典名称" prop="title">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="字典编码" prop="title">
      <el-input v-model="form.code" />
    </el-form-item>
    <el-form-item style="text-align: left;">
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
    }
  },
  data() {
    return {
      form: {},
      rules: {
        name: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        code: [{ required: true, message: '请填写内容', trigger: 'blur' }]
      }
    }
  },
  watch: {
    getform: {
      handler(newValue, oldValue) {
        this.form = newValue
      },
      deep: true
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
