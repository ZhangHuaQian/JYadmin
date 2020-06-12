<template>
  <el-form ref="form" :model="form" :rules="rules" :disabled="isSelect" label-width="120px">
    <el-form-item label="栏目名称" prop="columnId">
      <el-cascader
        style="width: 100%;"
        v-model="form.columnId"
        :options="optionsList"
        :props="{value: 'id', label: 'name', children: 'child',checkStrictly: true}"
        @change="handleChange"
      />
    </el-form-item>
    <el-form-item label="标题名称">
      <el-input maxlength="60" v-model="form.title" />
    </el-form-item>
    <el-form-item label="内容">
      <Tinymce ref="editor" v-model="form.content" :height="400" />
    </el-form-item>
    <el-form-item v-if="!isSelect" style="text-align: left;">
      <el-button type="primary" @click="onSubmit">确认</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { getList } from '@/api/request'
export default {
  components: {
    Tinymce
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
      form: {
        columnId:[]
      },
      rules: {
        columnId: [{ required: true, message: '请填写内容', trigger: 'blur' }],
      },
      optionsList:[]
    }
  },
  created() {
    if (this.getform) {
      this.form = this.getform
      // this.form.columnId=[...this.getform.columnName]
      console.log(this.form.columnId)
      this.form.columnId = [this.form.columnId]
    }
    this.getOptionsList()
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.columnId=this.form.columnId.pop()
          this.$emit('onSubmit', this.form)
        } else {
          this.$message('有内容没有填写！')
        }
      })
    },
    getOptionsList() {
      const data = {
        openPage: 0,
      }
      getList('sys/column/', data,'selectList').then(response => {
        const results = response.data
        this.optionsList = results.data
      })
    },
    onCancel() {
      this.$emit('onClose')
    },
    handleChange(value) {
    },
  }
}
</script>

<style scoped>

</style>
