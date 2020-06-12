<template>
  <div>
    <el-button type="primary" size="small" icon="el-icon-view" plain @click="handleEnter" />
    <el-dialog title="查看" :visible.sync="dialogFormVisible" width="70%" top="7vh">
      <FormArticle v-if="dialogFormVisible&&type===1||type===2" :getform="form"  @onClose="dialogFormVisible = false" :is-select="true" />
      <FormVideo v-if="dialogFormVisible&&type===3" :getform="form" @onClose="dialogFormVisible = false" :is-select="true" />
    </el-dialog>
  </div>
</template>

<script>
import FormArticle from './components/formArticle.vue'
import FormVideo from './components/formVideo.vue'
import { select } from '@/api/request'
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
