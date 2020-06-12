<template>
  <div>
    <el-row style="border-bottom: 1px solid #eaeaea;">
      <h4>站点列表</h4>
    </el-row>
    <el-tree
      ref="tree"
      class="filter-tree"
      :data="list"
      node-key="id"
      :props="defaultProps"
      default-expand-all
      highlight-current
      @row-click="checkedTableRow"
    >
    </el-tree>
  </div>
</template>

<script>
import { getList } from '@/api/request'
// import moment from 'moment'
// moment.locale('zh-cn')
export default {
  props: {
    formInline: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      listLoading: true,
      list: [],
      checkedItem: {},
      defaultProps: {
        children: 'child',
        label: 'name'
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
        ...this.formInline
      }
      getList('sys/site/', data, 'getCurrentSiteAndChildrenTree').then(response => {
        const results = response.data
        this.list = results.data
        this.checkedItem = this.list[0]
        this.listLoading = false
        this.$refs.tree.setCurrentKey(this.checkedItem, true)
        this.checkedTableRow(this.list[0])
      })
    },
    checkedTableRow(row, column, event) {
      this.checkedItem = row
      this.$emit('getCheckedItem', row)
    }
  }
}
</script>

<style scoped>
  .el-table /deep/ .el-table__body tr.current-row>td {
    border-top: 2px solid #d4e8ff;
  }
</style>
