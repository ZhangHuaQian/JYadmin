<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="组织类型">
        <el-select v-model="formInline.organizationId" clearable>
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.organizationName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="formInline.introduce" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="21">
        <el-tabs>
          <el-tab-pane label="组织列表" />
        </el-tabs>
      </el-col>
      <el-col :span="2" style="text-align: center;">
        <insertComponent @refresh="getList">
          <template v-slot:btnLabel>
            添加组织
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
      <el-table-column label="组织类型">
        <template v-slot="scope">
          {{ scope.row.organizationName }}
        </template>
      </el-table-column>
      <el-table-column label="组织名称">
        <template v-slot="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="负责人">
        <template v-slot="scope">
          {{ scope.row.principal }}
        </template>
      </el-table-column>
      <el-table-column label="简介">
        <template v-slot="scope">
          {{ scope.row.introduce }}
        </template>
      </el-table-column>
      <el-table-column label="添加时间">
        <template v-slot="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="170" label="操作">
        <template v-slot="scope">
          <el-row>
            <el-col :span="8">
              <selectComponent :itemid="scope.row.id" @refresh="getList">
                <template v-slot:btnLabel>
                  添加类型
                </template>
              </selectComponent>
            </el-col>
            <el-col :span="8">
              <updateComponent :itemid="scope.row.id" @refresh="getList">
                <template v-slot:btnLabel>
                  编辑类型
                </template>
              </updateComponent>
            </el-col>
            <el-col :span="8">
              <deleteComponent :itemid="scope.row.id" @refresh="getList">
                <template v-slot:btnLabel>
                  删除类型
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
      pageSize: 10, // 每页的数据条数
      formInline: {},
      options: []
    }
  },
  mounted() {
    this.getList()
    this.getOptionsList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const data = {
        ...this.formInline,
        page: this.currentPage
      }
      getList('sys/department/', data,'selectList').then(response => {
        const results = response.data
        this.currentPage = results.data.pageNum
        this.total = results.data.count
        this.list = results.data.data
        this.listLoading = false
      })
    },
    getOptionsList() {
      const data = {
        openPage: 0
      }
      getList('sys/department/', data,'selectList').then(response => {
        const results = response.data
        this.options = results.data.data
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
