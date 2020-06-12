<template>
  <div>
    <el-button class="bg-purple" @click.native="dialogFormVisible=true">链接到内容</el-button>
    <el-dialog
      :modal-append-to-body="false"
      :append-to-body="true"
      :close-on-click-modal="false"
      title="选择内容"
      :visible.sync="dialogFormVisible"
      width="70%"
      top="3vh"
    >
      <el-row :gutter="10">
        <el-col :span="6">
          <div style="border: 1px solid #e0e0e0;padding: 10px;height: 100%;">
            <h4>站点栏目</h4>
            <el-tree
              ref="tree"
              highlight-current
              class="filter-tree"
              :data="data"
              :props="defaultProps"
              default-expand-all
              @node-click="handleNodeClick"
            />
          </div>
        </el-col>
        <el-col :span="18">
          <div style="border: 1px solid #e0e0e0;padding: 10px;height: 100%;">
            <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
              <el-table-column align="center" label="序号" width="65">
                <template v-slot="scope">
                  {{ scope.$index+1+(currentPage-1)*10 }}
                </template>
              </el-table-column>
              <el-table-column label="发布时间">
                <template v-slot="scope">
                  {{ scope.row.createTime }}
                </template>
              </el-table-column>
              <el-table-column label="资讯标题">
                <template v-slot="scope">
                  {{ scope.row.title }}
                </template>
              </el-table-column>
              <el-table-column label="状态">
                <template v-slot="scope">
                  {{ scope.row.isUse }}
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              layout="total, prev, pager, next, jumper"
              :page-size="pageSize"
              :total="total"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-col>
      </el-row>

      <el-form-item  style="text-align: center;margin-top: 20px;">
        <el-button type="primary" @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>

    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/request'
export default {
  data() {
    return {
      dialogFormVisible: false,
      data: [],
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      listLoading: false,
      list: [],
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 10 // 每页的数据条数
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const data = {
        page: this.currentPage
      }
      getList('sys/column', data,'/selectList').then(response => {
        const results = response.data
        this.currentPage = results.pageNum
        this.total = results.count
        this.data = results.data
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
    onCancel(){
      this.dialogFormVisible=false
    },
    handleNodeClick(data) {
    },
  }
}
</script>

<style scoped>
  .el-cascader-node>.el-radio, .el-radio:last-child {
    margin-right: 30px;
  }
  .bg-purple {
    background: #d3dce6;
  }
</style>
