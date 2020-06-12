<template>
  <el-form ref="form" :model="form" :rules="rules" :disabled="isSelect" label-width="120px">
    <el-form-item label="所属字典" prop="pName" style="text-align: left;">
      <el-input v-model="form.pName" readonly />
    </el-form-item>
    <el-form-item label="字典数据" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="字典编码" prop="code">
      <el-input v-model="form.code" />
    </el-form-item>
    <el-form-item label="备注">
      <el-input
        v-model="form.remark"
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
    },
    pdata: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {},
      rules: {
        name: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        code: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        pName: [{ required: true, message: '请填写内容', trigger: 'blur' }]
      }
    }
  },
  watch: {
    pdata: {
      handler(newValue, oldValue) {
        this.form.pName = newValue.name
        this.form.pCode = newValue.code
      },
      deep: true
    }
  },
  created() {
    if (this.pdata) {
      this.form.pName = this.pdata.name
      this.form.pCode = this.pdata.code
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
