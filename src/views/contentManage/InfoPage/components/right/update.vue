<template>
  <div>
    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleEnter" />
    <el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="dialogFormVisible" width="60%" top="7vh">
      <FormArticle v-if="dialogFormVisible&&type===1||type===2" :getform="form" @onSubmit="handleSubmit" @onClose="dialogFormVisible = false" :is-updata="true" />
      <FormVideo v-if="dialogFormVisible&&type===3" :getform="form" @onSubmit="handleSubmit" @onClose="dialogFormVisible = false" :is-updata="true" />
    </el-dialog>
  </div>
</template>

<script>
import FormArticle from './components/formArticle.vue'
import FormVideo from './components/formVideo.vue'
import { update, select } from '@/api/request'

export default {
  components: {
    FormArticle,
    FormVideo
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
      form: {
        type:1
      }
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
      const data = { id: this.itemid}
      select('sys/news', data, '/select').then(response => {
        const results = response.data
        this.form = results.data
        this.dialogFormVisible = true
      })
    },
    handleSubmit(form) {
      update('sys/news', form).then(response => {
        this.dialogFormVisible = false
        this.$emit('refresh')
      })
    }
  }
}
</script>

<style>
</style>
