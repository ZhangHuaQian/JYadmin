<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24" style="margin-bottom: 10px;">
        站点管理
        <!-- <el-tabs>
          <el-tab-pane label="站点管理" />
        </el-tabs> -->
      </el-col>
    </el-row>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" stripe>
      <el-table-column align="center" label="排名">
        <template v-slot="scope">
          {{ scope.$index+1+(currentPage-1)*10 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="站点名称">
        <template v-slot="scope">
          {{ scope.row.siteName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布量">
        <template v-slot="scope">
          {{ scope.row.num }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, update } from '@/api/request'
// import moment from 'moment'
// moment.locale('zh-cn')
export default {
  components: {
  },
  data() {
    return {
      currentPage: 1, // 当前页码
      listLoading: true,
      list: [],
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
      getList('sys/newsPublish/', data,'select').then(response => {
        const results = response.data
        this.list = results.data
        this.listLoading = false
      })
    },
    onSubmit() {
      this.getList()
    },
  }
}
</script>

<style scoped>

</style>
