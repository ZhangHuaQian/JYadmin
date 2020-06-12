<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="标题名称">
        <el-input v-model="formInline.title" />
      </el-form-item>
      <el-form-item label="内容类型">
        <el-select v-model="formInline.type" clearable>
          <el-option label="文章" :value="0" />
          <el-option label="视频" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="发布人">
        <el-input v-model="formInline.title" />
      </el-form-item></br>
      <el-form-item label="发布时间">
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
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="20">
        <el-tabs v-model="activeName" @tab-click="getList()">
          <el-tab-pane label="全部" name="0" />
          <el-tab-pane label="草稿" name="1" />
          <el-tab-pane label="待审核" name="2" />
          <el-tab-pane label="已通过" name="3" />
          <el-tab-pane label="已退稿" name="4" />
          <el-tab-pane label="已发布" name="5" />
          <el-tab-pane label="已下线" name="6" />
        </el-tabs>
      </el-col>
      <el-col :span="4" style="text-align: center;">
        <el-col :span="12" style="text-align: center;">
          <insertComponent :type="1" @refresh="getList">
            <template v-slot:btnLabel>
              创建文章
            </template>
          </insertComponent>
        </el-col>
        <el-col :span="12" style="text-align: center;">
          <insertComponent :type="2" @refresh="getList">
            <template v-slot:btnLabel>
              创建视频
            </template>
          </insertComponent>
        </el-col>
      </el-col>
      <!-- <el-col :span="1">
        <el-button icon="el-icon-refresh" circle @click="getList" />
      </el-col> -->
    </el-row>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="序号" width="65">
        <template v-slot="scope">
          {{ scope.$index+1+(currentPage-1)*10 }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="180" label="创建时间">
        <template v-slot="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="类容类型" align="center" width="110">
        <template v-slot="scope">
          {{ scope.row.type | typeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="标题名称">
        <template v-slot="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="浏览量" align="center" width="65">
        <template v-slot="scope">
          {{ scope.row.pageView }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="110">
        <template v-slot="scope">
          {{ scope.row.verify | statusFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="170" label="操作">
        <template v-slot="scope">
          <el-row>
            <el-col :span="8">
              <selectComponent :itemid="scope.row.id" :type="scope.row.type" @refresh="getList">
                <template v-slot:btnLabel>
                  查看站点
                </template>
              </selectComponent>
            </el-col>
            <el-col :span="8">
              <updateComponent :itemid="scope.row.id" :type="scope.row.type" @refresh="getList">
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
  filters: {
    statusFilter: value => {
      const statusMap = {
        '1': '草稿',
        '2': '待审核',
        '3': '已通过',
        '4': '已退稿',
        '5': '已发布',
        '6': '已下线'
      }
      return statusMap[value]
    },
    typeFilter:value=>{
      const stypeMap={
        '1':'标题新闻',
        '2':'非标题新闻',
        '3':'视频'
      }
      return stypeMap[value]
    }
  },
  data() {
    return {
      checkedItem: {},
      listLoading: false,
      list: [],
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 10, // 每页的数据条数
      formInline: {},
      activeName: '0'
    }
  },
  methods: {
    getCheckedItem(data) {
      console.log(data)
      this.checkedItem = data
      this.getList()
    },
    getList() {
      this.listLoading = true
      const data = {
        ...this.formInline,
        columnId: this.checkedItem.id,
        verify: this.activeName==0?'':this.activeName,
        pageNum: this.currentPage
      }

      getList('sys/news', data,'/selectList').then(response => {
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
