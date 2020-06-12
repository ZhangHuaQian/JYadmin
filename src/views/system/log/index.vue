<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="操作用户">
        <el-input v-model="formInline.loginName" />
      </el-form-item>
      <el-form-item label="操作事件">
        <el-input v-model="formInline.content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="23">
        <el-tabs type="card">
          <el-tab-pane label="操作日志列表" />
        </el-tabs>
      </el-col>
      <el-col :span="1">
        <el-button icon="el-icon-refresh" circle @click="getList" />
      </el-col>
    </el-row>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="序号" width="65">
        <template v-slot="scope">
          {{ scope.$index+1+(currentPage-1)*10 }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" label="操作时间">
        <template v-slot="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作用户">
        <template v-slot="scope">
          {{ scope.row.loginName }}
        </template>
      </el-table-column>
      <el-table-column label="操作事件">
        <template v-slot="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="65" label="操作">
        <template v-slot="scope">
          <el-row>
            <el-col :span="8"><deleteComponent :itemid="scope.row.id" @refresh="getList" /></el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/request'
import deleteComponent from './delete.vue'
// import moment from 'moment'
// moment.locale('zh-cn')
export default {
  components: {
    deleteComponent
  },
  data() {
    return {
      listLoading: false,
      list: [],
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 10, // 每页的数据条数
      formInline: {},
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const data = {
        ...this.formInline,
        type: this.activeName,
        page: this.currentPage
      }
      getList('sys/operateLogs/', data, 'selectList').then(response => {
        const results = response.data
        this.currentPage = results.data.pageNum
        this.total = results.data.count
        this.list = results.data.data
        this.listLoading = false
      })
    },
    onSubmit() {
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
