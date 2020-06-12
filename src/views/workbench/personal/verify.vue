<template>
  <div>
    <el-link type="primary" size="small" @click.native="handleEnter">审核</el-link>
    <el-dialog :close-on-click-modal="false" title="审核" :visible.sync="dialogFormVisible" width="80%" top="3vh">
      <articleComponent v-if="dialogFormVisible && type===1||type===2" :verifys="11" :getVerifyform="form" @onSubmit="handleSubmit" @onClose="dialogFormVisible = false" />
      <videoComponent v-if="dialogFormVisible && type===3" :verifys="11" :getVerifyform="form" @onSubmit="handleSubmit" @onClose="dialogFormVisible = false" />
    </el-dialog>
  </div>
</template>

<script>
import articleComponent from '../contentDetail/article/index'
import videoComponent from '../contentDetail/video/index'
import { insert, select} from '@/api/request.js'

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
    type:{
      type:Number,
      default:null
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {}
    }
  },
  mounted() {

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
      select('sys/news', data).then(response => {
        const results = response.data
        this.form = results.data
        this.dialogFormVisible = true
      })
    },
    handleSubmit(form) {
      insert('sys/newsVerify', form).then(response => {
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
