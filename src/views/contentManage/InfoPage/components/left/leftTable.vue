<template>
  <div>
    <el-row style="border-bottom: 1px solid #eaeaea;">
      <h4>栏目列表</h4>
    </el-row>
    <el-tree
      ref="tree"
      class="filter-tree"
      :data="list"
      :props="defaultProps"
      default-expand-all
      @node-click="checkedTableRow"
    />
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
      filterText: '',
      list: [],
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      checkedItem: {}
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const data = {
        ...this.formInline
      }
      getList('sys/column', data, '/selectList').then(response => {
        const results = response.data
        this.list = results.data
        this.checkedItem = this.list[0]
        this.listLoading = false
      })
    },
    checkedTableRow(data, node, e) {
      this.checkedItem = data
      this.$emit('getCheckedItem', data)
    },
  }
}
</script>

<style lang="scss" scoped>
  .el-table /deep/ .el-table__body tr.current-row>td {
    border-top: 2px solid #d4e8ff;
  }

</style>
