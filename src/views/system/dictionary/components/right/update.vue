<template>
  <div>
    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleEnter" />
    <el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="dialogFormVisible" width="60%" top="7vh">
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
        this.form = results.data
        this.dialogFormVisible = true
      })
    },
    handleSubmit(form) {
      update('dictionary', form, '/updateValue').then(response => {
        const results = response.data
        this.dialogFormVisible = false
        this.$emit('refresh')
      })
    }
  }
}
</script>

<style>
</style>
