<template>
  <div>
    <el-button plain @click="dialogFormVisible = true">添加字典数据</el-button>
    <el-dialog :close-on-click-modal="false" title="添加" :visible.sync="dialogFormVisible" width="60%" top="7vh">
      <FormUI v-if="dialogFormVisible" :pdata="leftCheckedItem" @onSubmit="handleSubmit" @onClose="dialogFormVisible = false" />
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
  props: {
    leftCheckedItem: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialogFormVisible: false
    }
  },
  methods: {
    handleSubmit(form) {
      insert('dictionary', form, '/insertValue').then(response => {
        this.dialogFormVisible = false
        this.$emit('refresh')
      })
    }
  }
}
</script>

<style>
</style>
