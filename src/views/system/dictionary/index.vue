<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="22">
          <el-form-item label="字典名称">
            <el-input v-model="formInline.name" />
          </el-form-item>
          <el-form-item label="字典编码">
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
      <el-col :span="11" style="min-height: 780px;border: 1px solid #eaeaea;">
        <leftTable ref="leftTable" :form-inline="formInline" @getCheckedItem="getCheckedItem" />
      </el-col>
      <el-col :span="13" style="min-height: 780px;border: 1px solid #eaeaea;border-left: 0px;">
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
      formInline: {}
    }
  },
  methods: {
    refresh() {
      this.$refs.leftTable.getList()
    },
    getCheckedItem(data) {
      this.$refs.rightTable.getList(data)
    }
  }
}
</script>

<style scoped>

</style>
