<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="22">
          <el-form-item label="角色名称">
            <el-input v-model="formInline.name" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="refresh">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="text-align: center;">
          <el-form-item>
            <el-button plain @click="refresh">刷新</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="30">
      <el-col :span="8" style="min-height: 780px;border: 1px solid #eaeaea;">
        <leftTable ref="leftTable" :form-inline="formInline" @getCheckedItem="getCheckedItem" />
      </el-col>
      <el-col :span="16" style="min-height: 780px;border: 1px solid #eaeaea;border-left: 0px;">
        <rightTree ref="rightTree" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import leftTable from './components/left/leftTable.vue'
import rightTree from './components/right/rightTree.vue'
// import moment from 'moment'
// moment.locale('zh-cn')
export default {
  components: {
    leftTable,
    rightTree
  },
  data() {
    return {
      formInline: {}
    }
  },
  methods: {
    refresh() {
      this.$refs.leftTable.getList()
      this.$refs.rightTree.getUserMenu()
    },
    getCheckedItem(item) {
      this.$refs.rightTree.getCheckedItem(item)
    }
  }
}
</script>

<style scoped>

</style>
