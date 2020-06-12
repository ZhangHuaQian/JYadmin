<template>
  <div>
    <el-button class="bg-purple" @click.native="dialogFormVisible=true">链接到栏目</el-button>
    <el-dialog
      :modal-append-to-body="false"
      :append-to-body="true"
      :close-on-click-modal="false"
      title="选择栏目"
      :visible.sync="dialogFormVisible"
      width="30%"
      top="3vh"
    >
      <div style="border: 1px solid #e0e0e0;padding: 10px;height: 100%;">
        <h4>当前选择：</h4>
        <h4>站点栏目</h4>
        <el-input
          v-model="filterText"
          placeholder="输入关键字进行搜索"
        />
        <el-tree
          ref="tree"
          highlight-current
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
        />
      </div>
      <el-form-item style="text-align: center;margin-top: 20px;">
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
      filterText: '',
      data: [],
      defaultProps: {
        children: 'child',
        label: 'name'
      },
    }
  },
   watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
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
    handleNodeClick(data) {
      this.$emit('getUrl',data.url)
    },
    onSubmit() {
      this.getList()
      this.dialogFormVisible = false
    },
    onCancel(){
      this.dialogFormVisible=false
    }
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
