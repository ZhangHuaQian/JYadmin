<template>
  <div>
    <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEnter" />
    <el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="dialogFormVisible" width="40%" top="7vh">
      <FormUI v-if="dialogFormVisible" :getform="form" @onSubmit="handleSubmit" @onClose="dialogFormVisible = false" />
    </el-dialog>
  </div>
</template>

<script>
import FormUI from './components/form.vue'
import { update, select } from '@/api/request'

export default {
  components: {
    FormUI
  },
  props: {
    itemid: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {}
    }
  },
  methods: {
    handleEnter() {
      if (this.itemid) {
        this.handleSelect()
      } else {
        this.$message.error('系统出错！请刷新重试！')
      }
    },
    handleSelect() {
      const data = { id: this.itemid }
      select('dictionary', data).then(response => {
        const results = response.data
        if (results.status === '1') {
          this.form = results.data
          this.dialogFormVisible = true
        } else {
          this.$message.error(results.msg)
        }
      })
    },
    handleSubmit(form) {
      update('dictionary', form, '/updateDict').then(response => {
        const results = response.data
        if (results.status === '1') {
          this.dialogFormVisible = false
          this.$emit('refresh')
          this.$message.success(results.msg)
        } else {
          this.$message.error(results.msg)
        }
      })
    }
  }
}
</script>

<style>
</style>
