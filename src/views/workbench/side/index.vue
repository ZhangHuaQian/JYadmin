<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="资讯标题">
        <el-input v-model="formInline.title" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.deliveryType" clearable>
          <el-option label="全部" :value="0" />
          <el-option label="待审核" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :on-pick="datePick"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRight">查询</el-button>
      </el-form-item>
    </el-form>
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
      formInline: {},
      checkedItem: {}
    }
  },
  methods: {
    getCheckedItem(data) {
      this.checkedItem = data
      this.handleRight()
    },
    handleRight() {
      const data = {
        ...this.formInline,
        data: this.checkedItem
      }
      this.$refs.rightTable.getCheckedItem(data)
    },
    datePick(value) {
      this.formInline.start = value[0]
      this.formInline.end = value[1]
    }
  }
}
</script>

<style scoped>

</style>
