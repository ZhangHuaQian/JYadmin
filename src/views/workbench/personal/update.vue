<template>
  <div>
    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleEnter" />
    <el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="dialogFormVisible" width="80%" top="3vh">
      <articleComponent v-if="dialogFormVisible && type===1||type===2" :getform="form" @onSubmit="handleSubmit" @onClose="dialogFormVisible = false" :is-updata="true" />
      <videoComponent v-if="dialogFormVisible && type===3" :getform="form" @onSubmit="handleSubmit" @onClose="dialogFormVisible = false" :is-insert="true" />
    </el-dialog>
  </div>
</template>

<script>
import articleComponent from '../contentDetail/article/index'
import videoComponent from '../contentDetail/video/index'
import { update, select } from '@/api/request'

export default {
  components: {
    articleComponent,
    videoComponent
  },
  props: {
    itemid: {
      type: Number,
      default: null
    },
    type: {
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
      select('sys/news', data, '/select').then(response => {
        const results = response.data
        this.form = results.data
        this.dialogFormVisible = true
      })
    },
    handleSubmit(form) {
      update('sys/news', form).then(response => {
        var data = response.data
        if (data.status==='1') {
          this.$message.success(data.msg)
        } else{
          this.$message.error(data.msg)
        }
        this.dialogFormVisible = false
        this.$emit('refresh')
      })
    }
  }
}
</script>

<style>
</style>
