<template>
  <div class="app-container">
    <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">
      <el-form-item label="站点名称">
        <el-input v-model="formInline.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="21">
        <el-tabs>
          <el-tab-pane label="站点管理" />
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
      <el-table-column label="站点ID">
        <template v-slot="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="站点名称">
        <template v-slot="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="状态">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.isUse"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="isUseChange(scope.row)"
          />
        </template>
      </el-table-column> -->
      <el-table-column align="center" width="170" label="操作">
        <template v-slot="scope">
          <el-row>
            <el-col :span="8">
             <selectComponent :itemid="scope.row.id" @refresh="getList">
                <template v-slot:btnLabel>
                  查看站点
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
import { getList, update } from '@/api/request'
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
        pageNum: this.currentPage
      }
      getList('sys/site/', data,'selectList').then(response => {
        const results = response.data
        this.currentPage = results.data.pageNum
        this.total = results.data.count
        this.list = results.data.data
        this.listLoading = false
      })
    },
    onSubmit() {
      for (var key in this.formInline) {
        if (!this.formInline[key]) {
          delete this.formInline[key]
        }
      }
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    // isUseChange(row) {
    //   this.listLoading = true
    //   const data = {
    //     id: row.id,
    //     isUse: row.isUse
    //   }
    //   update('scenicNews', data, '/setIsUse').then(response => {
    //     const results = response.data
    //     if (results.status !== '1') {
    //       row.isUse = Math.abs(row.isUse - 1)
    //       this.listLoading = false
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>

</style>
