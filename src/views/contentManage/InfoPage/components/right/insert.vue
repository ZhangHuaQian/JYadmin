<template>
  <div>
    <el-button plain style="margin-bottom: 10px;" @click="dialogFormVisible=true">
      <slot name="btnLabel" />
    </el-button>
    <el-dialog :close-on-click-modal="false" :title="type==1?'创建文章':'创建视频'" :visible.sync="dialogFormVisible" width="60%" top="7vh">
      <FormArticle v-if="dialogFormVisible&&type===1" @onSubmit="handleSubmit" @onClose="dialogFormVisible = false" :is-insert="true" />
      <FormVideo v-if="dialogFormVisible&&type===2" @onSubmit="handleSubmit" @onClose="dialogFormVisible = false" :is-insert="true" />
    </el-dialog>
  </div>
</template>

<script>
import FormArticle from './components/formArticle.vue'
import FormVideo from './components/formVideo.vue'
import { insert } from '@/api/request.js'

export default {
  components: {
    FormArticle,
    FormVideo
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
  methods: {
    handleSubmit(form) {
      insert('sys/news', form).then(response => {
        this.dialogFormVisible = false
        this.$emit('refresh')
      })
    }
  }
}
</script>

<style scoped>
</style>
