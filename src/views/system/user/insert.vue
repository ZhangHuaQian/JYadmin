<template>
  <div>
    <el-button plain style="margin-bottom: 10px;" @click="dialogFormVisible=true">
      <slot name="btnLabel" />
    </el-button>
    <el-dialog :close-on-click-modal="false" title="添加" :visible.sync="dialogFormVisible" width="60%" top="7vh">
      <FormUI v-if="dialogFormVisible" @onSubmit="handleSubmit" @onClose="dialogFormVisible = false" />
    </el-dialog>
  </div>
</template>

<script>
import FormUI from './components/form.vue'
import { insert } from '@/api/request.js'

export default {
  components: {
    FormUI
  },
  data() {
    return {
      dialogFormVisible: false
    }
  },
  methods: {
    handleSubmit(form) {
      insert('sys/ucenter', form).then(response => {
        this.dialogFormVisible = false
        this.$emit('refresh')
      })
    }
  }
}
</script>

<style>
</style>
