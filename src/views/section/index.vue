<template>
  <div class="app-container">
    <el-row>
      <el-col :span="21">
        <el-tabs>
          <el-tab-pane label="站点管理" />
        </el-tabs>
      </el-col>
      <el-col :span="2" style="text-align: center;">
        <insertComponent @refresh="getList">
          <template v-slot:btnLabel>
            新增栏目
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
      <el-table-column class="tree" label="栏目ID">
        <template v-slot="scope">
          <!-- {{ scope.row.id }} -->
          <el-tree
             :data="[...scope.row]"
             node-key="id"
             :default-expand-all="true"
             :props="defaultPropsId"
             >
          </el-tree>
        </template>
      </el-table-column>
      <el-table-column label="分类名称">
        <template v-slot="scope">
          <el-tree
             :data="[...scope.row]"
             node-key="id"
             :default-expand-all="true"
             :props="defaultProps"
             >
          </el-tree>
        </template>
      </el-table-column>
      <el-table-column label="内容类型">
        <template v-slot="scope">
          <el-tree
            :data="[...scope.row]"
            node-key="id"
            :default-expand-all="true"
            :props="defaultPropsList"
          >
          </el-tree>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template v-slot="scope">
         <!-- <el-switch
            v-model="scope.row.isShow"
            active-color="#13ce66"
            inactive-color="#ccc"
            :active-value="1"
            :inactive-value="0"
            @change="isUseChange(scope.row)"
          /> -->
          {{scope.row.isShow==1?"开启":"关闭"}}
        </template>
      </el-table-column>
      <el-table-column label="排序">
        <template v-slot="scope">
          <!-- {{ scope.row.name }} -->
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
    <!-- <div class="block">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div> -->
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
      options: [],
      defaultProps: {   //分类名称
        children: 'child',
        label: 'name'
      },
      defaultPropsList: {   //内容类型
        children: 'child',
        label: 'typeName'
      },
      defaultPropsId:{
        children: 'child',
        label: 'id'
      }
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
      }
      getList('sys/column/', data,'selectList').then(response => {
        const results = response.data
        this.list = results.data[0].child
        this.listLoading = false
      })
      // 数据字典
      getList('sys/dictionary/', data,'selectList').then(response => {
        const results = response.data
        this.listLoading = false
      })
    },
    onSubmit() {
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    isUseChange(row) {
      // this.listLoading = true
      // const data = {
      //   id: row.id,
      //   isUse: row.isUse
      // }
      // update('scenicNews', data, '/setIsUse').then(response => {
      //   const results = response.data
      //   if (results.status !== '1') {
      //     row.isUse = Math.abs(row.isUse - 1)
      //     this.listLoading = false
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped\>
.el-tree-node__content {
  padding-left: 30px !important;
}
</style>
