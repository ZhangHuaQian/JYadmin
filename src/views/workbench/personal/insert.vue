<template>
  <div>
    <el-button plain style="margin-bottom: 10px;" @click="dialogFormVisible=true">
      <slot name="btnLabel" />
    </el-button>
    <el-dialog :close-on-click-modal="false" title="添加" :visible.sync="dialogFormVisible" width="80%" top="3vh">
      <articleComponent v-if="dialogFormVisible&&type===1" @onSubmit="handleSubmit" @onSave="handleSave" @onClose="dialogFormVisible = false" :is-insert="true" />
      <videoComponent v-if="dialogFormVisible&&type===2" @onSubmit="handleSubmit"  @onSave="handleSave" @onClose="dialogFormVisible = false" :is-insert="true" />
    </el-dialog>
  </div>
</template>

<script>
import articleComponent from '../contentDetail/article/index'
import videoComponent from '../contentDetail/video/index'
import { insert } from '@/api/request.js'

export default {
  components: {
    articleComponent,
    videoComponent
  },
  props: {
    type: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      dialogFormVisible: false
    }
  },
  mounted() {
  },
  methods: {
    handleSubmit(form) {
      insert('sys/news', form).then(response => {
        var data = response.data
        if (data.status==='1') {
          this.$message.success(data.msg)
        } else{
          this.$message.error(data.msg)
        }
        this.dialogFormVisible = false
        this.$emit('refresh')
      })

    },
    handleSave(form){
      insert('sys/news', form).then(response => {
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
