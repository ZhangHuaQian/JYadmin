<template>
  <div>
    <el-button type="primary" size="small" icon="el-icon-view" plain @click="handleEnter" />
    <el-dialog title="查看" :visible.sync="dialogFormVisible" width="70%" top="7vh">
      <FormUI v-if="dialogFormVisible" :getform="form" :is-select="true" @onClose="dialogFormVisible = false" />
    </el-dialog>
  </div>
</template>

<script>
import FormUI from './components/form.vue'
import { select } from '@/api/request'
export default {
  components: {
    FormUI
  },
  props: {
    itemid: {
      type: Number,
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
      select('sys/organization', data, '/select').then(response => {
        const results = response.data
        this.form = results.data
        this.dialogFormVisible = true
      })
    }
  }
}
</script>

<style scoped>
  img{
    width: 100%;
  }
  .weui-content{
    height: 600px;
    overflow-y: auto;
  }
  .files-item {
    padding: 5px 0px;
  }
</style>
