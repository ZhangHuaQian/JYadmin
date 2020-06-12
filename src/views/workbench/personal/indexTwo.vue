<template>
  <div class="app-container">

    <el-form :model="form" ref="form" :inline="true" class="demo-form-inline">
      <el-form-item label="资讯标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-form-item label="状态" style="text-align: left;">
          <el-select v-model="form.status">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </el-form-item>
      <br>
      <el-form-item label="创建时间">
        <el-date-picker v-model="form.value1"></el-date-picker>&nbsp;至&nbsp;
        <el-date-picker v-model="form.value2"></el-date-picker>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="onSubmit()">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="序号" width="85">
        <template v-slot="scope">
          {{ scope.$index+1+(currentPage-1)*10 }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="180" label="创建时间">
        <template v-slot="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="资讯标题">
        <template v-slot="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="作者" width="120">
        <template v-slot="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="120">
        <template v-slot="scope">
          {{ scope.row.verify | statusFilter }}
        </template>
      </el-table-column>
     <el-table-column align="center" width="200" label="操作">
        <template v-slot="scope">
          <el-row>
            <el-col :span="24">
             <verifyComponent :itemid="scope.row.id" :type="scope.row.type" @refresh="getList" />
            </el-col>
          </el-row>
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
</template>

<script>
  import { mapGetters } from 'vuex'
  import {
    getList
  } from '@/api/request'
  import verifyComponent from './verify.vue'
  // import moment from 'moment'
  // moment.locale('zh-cn')
  export default {
    components: {
      verifyComponent,
    },
    filters: {
      statusFilter: value => {
        const statusMap = {
          '1': '草稿',
          '2': '待审核',
          '3': '已通过',
          '4': '已退稿',
          '5': '已发布'
        }
        return statusMap[value]
      }
    },
    data() {
      return {
        listLoading: true,
        list: [],
        currentPage: 1, // 当前页码
        total: 0, // 总条数
        pageSize: 10, // 每页的数据条数
        formInline: {},
        form: {
          title: '',
          status:'',
          value1:'',
          value2:''
        },
        options: [{
          id:'1',
          value: '1',
          name: '草稿'
        }, {
          id:'2',
          value: '2',
          name: '待审核'
        }, {
          id:'3',
          value: '3',
          name: '已通过'
        }, {
          id:'4',
          value: '4',
          name: '已退稿'
        }, {
          id:'5',
          value: '5',
          name: '已发布'
        }],
      }
    },
    computed: {
        ...mapGetters([
          'name'
        ])
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        const data = {
          pageNum: this.currentPage
        }
        getList('sys/news/', data,'verifyList').then(response => {
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
