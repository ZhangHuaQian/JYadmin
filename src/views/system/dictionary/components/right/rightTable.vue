<template>
  <div>
    <el-row style="border-bottom: 1px solid #eaeaea;">
      <el-col :span="20"><h4>字典数据</h4></el-col>
      <el-col :span="4" style="line-height: 60px;text-align: center;">
        <el-row>
          <insertComponent :left-checked-item="leftCheckedItem" @refresh="getList" />
        </el-row>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
      empty-text="暂无数据,请重新选择左边字典列表"
    >
      <el-table-column align="center" label="序号" width="65">
        <template v-slot="scope">
          {{ scope.$index+1+(currentPage-1)*10 }}
        </template>
      </el-table-column>
      <el-table-column label="数据名称">
        <template v-slot="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="所属字典">
        <template v-slot="scope">
          {{ scope.row.pName }}
        </template>
      </el-table-column>
      <el-table-column label="字典编码">
        <template v-slot="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template v-slot="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="170" label="操作">
        <template v-slot="scope">
          <el-row>
            <el-col :span="8"><selectComponent :itemid="scope.row.id" @refresh="getList" /></el-col>
            <!--            <el-col :span="8"><updateComponent :itemid="scope.row.id" @refresh="getList" /></el-col>
            <el-col :span="8"><deleteComponent :itemid="scope.row.id" @refresh="getList" /></el-col> -->
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
import insertComponent from './insert.vue'
import selectComponent from './select.vue'
// import updateComponent from './update.vue'
// import deleteComponent from './delete.vue'
// import moment from 'moment'
// moment.locale('zh-cn')
export default {
  components: {
    insertComponent,
    selectComponent
    // updateComponent,
    // deleteComponent
  },
  data() {
    return {
      listLoading: false,
      list: [],
      leftCheckedItem: {},
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 10 // 每页的数据条数
    }
  },
  methods: {
    getList(getdata) {
      var data
      if (getdata) {
        data = getdata
      } else {
        data = this.leftCheckedItem
      }
      this.listLoading = true
      this.leftCheckedItem = data
      const newdata = {
        pName: data.name,
        pCode: data.code,
        page: this.currentPage
      }
      getList('dictionary', newdata, '/selectValueList').then(response => {
        const results = response.data
        this.currentPage = results.pageNum
        this.total = results.count
        this.list = results.data
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    }
  }
}
</script>

<style>
</style>
