<template>
  <div class="app-container">
    <el-row>
      <el-col :span="21">
        <el-tabs v-model="activeName" @tab-click="getList()">
          <el-tab-pane label="全部" name="0" />
          <el-tab-pane label="待审核" name="1" />
          <el-tab-pane label="已通过" name="2" />
          <el-tab-pane label="已发布" name="3" />
          <el-tab-pane label="已退稿" name="4" />
          <el-tab-pane label="草稿" name="5" />
        </el-tabs>
      </el-col>
      <el-col :span="2" style="text-align: center;">
        <insertComponent @refresh="getList">
          <template v-slot:btnLabel>
            添加站点
          </template>
        </insertComponent>
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
      <el-table-column align="center" width="110" label="创建时间">
        <template v-slot="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="资讯标题">
        <template v-slot="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110">
        <template v-slot="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110">
        <template v-slot="scope">
          {{ scope.row.verify | statusFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="170" label="操作">
        <template v-slot="scope">
          <el-row>
            <el-col :span="8">
              <selectComponent :itemid="scope.row.id" @refresh="getList">
                <template v-slot:btnLabel>
                  添加站点
                </template>
              </selectComponent>
            </el-col>
            <el-col :span="8">
              <updateComponent :itemid="scope.row.id" @refresh="getList">
                <template v-slot:btnLabel>
                  编辑站点
                </template>
              </updateComponent>
            </el-col>
            <el-col :span="8">
              <deleteComponent :itemid="scope.row.id" @refresh="getList">
                <template v-slot:btnLabel>
                  删除站点
                </template>
              </deleteComponent>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/request'
import insertComponent from './insert.vue'
import updateComponent from './update.vue'
import deleteComponent from './delete.vue'
import selectComponent from './select'
// import moment from 'moment'
// moment.locale('zh-cn')
export default {
  components: {
    insertComponent,
    updateComponent,
    selectComponent,
    deleteComponent
  },
  filters: {
    statusFilter: value => {
      const statusMap = {
        '1': '待审核',
        '2': '已通过',
        '3': '已发布',
        '4': '已退稿',
        '5': '草稿'
      }
      return statusMap[value]
    }
  },
  data() {
    return {
      checkedItem: {},
      listLoading: true,
      list: [],
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 10, // 每页的数据条数
      formInline: {},
      activeName: '1',
      options: []
    }
  },
  methods: {
    getCheckedItem(data) {
      this.checkedItem = data.data
      this.formInline = data.formInline
      this.getList()
    },
    getList() {
      this.listLoading = true
      const data = {
        ...this.formInline,
        verify: this.activeName,
        pageNum: this.currentPage
      }
      getList('sys/news/', data,'selectMyNewsList').then(response => {
        const results = response.data
        if (!results.data) {
          this.$message.error(results.msg)
        }
        this.currentPage = results.data.pageNum
        this.total = results.data.count
        this.list = results.data.data
        this.listLoading = false
      })
    },
    datePick(start, end) {
      this.formInline.start = start
      this.formInline.end = end
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
