<template>
  <div class="app-container">
    <el-row>
      <el-col :span="21">
        <el-tabs>
          <el-tab-pane label="单页管理" />
        </el-tabs>
      </el-col>
      <el-col :span="2" style="text-align: center;">
       <insertComponent @refresh="getList">
          <template v-slot:btnLabel>
            添加单页
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
      <el-table-column label="栏目ID" width="120">
        <template v-slot="scope">
          {{ scope.row.columnId }}
        </template>
      </el-table-column>
      <el-table-column label="栏目名称">
        <template v-slot="scope">
          {{ scope.row.columnName }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="170" label="操作">
        <template v-slot="scope">
          <el-row>
            <el-col :span="8">
              <selectComponent :itemid="scope.row.id" @refresh="getList">
                <template v-slot:btnLabel>
                  预览
                </template>
              </selectComponent>
            </el-col>
            <el-col :span="8">
              <updateComponent :itemid="scope.row.id" @refresh="getList">
                <template v-slot:btnLabel>
                  编辑
                </template>
              </updateComponent>
            </el-col>
            <el-col :span="8">
              <deleteComponent :itemid="scope.row.id" @refresh="getList">
                <template v-slot:btnLabel>
                  删除
                </template>
              </deleteComponent>
            </el-col>
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
  data() {
    return {
      listLoading: true,
      list: [],
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 10 ,// 每页的数据条数
      title:''// 标题名称
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
        pageNum: this.currentPage,
        title:this.title
      }
      getList('sys/infoPage', data).then(response => {
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
