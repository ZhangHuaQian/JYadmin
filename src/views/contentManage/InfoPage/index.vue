<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4" style="min-height: 780px;border: 1px solid #eaeaea;">
        <leftTable ref="leftTable" :form-inline="formInline" @getCheckedItem="getCheckedItem" />
      </el-col>
      <el-col :span="20" style="min-height: 780px;border: 1px solid #eaeaea;border-left: 0px;">
        <rightTable ref="rightTable" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import leftTable from './components/left/leftTable.vue'
import rightTable from './components/right/rightTable.vue'
// import moment from 'moment'
// moment.locale('zh-cn')
export default {
  components: {
    leftTable,
    rightTable
  },
  data() {
    return {
      checkedItem: {},
      formInline: {}
    }
  },
  methods: {
    getCheckedItem(data) {
      this.checkedItem = data
      this.handleRight()
    },
    handleRight() {
      this.$refs.rightTable.getCheckedItem(this.checkedItem)
    }
  }
}
</script>

<style scoped>

</style>
