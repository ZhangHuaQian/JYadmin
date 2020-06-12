<template>
  <div class="app-container">

    <el-form :model="form" ref="form" :inline="true" class="demo-form-inline">
      <el-form-item label="资讯标题">
        <el-input v-model="formInline.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-form-item label="状态" style="text-align: left;">
          <el-select v-model="formInline.status">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </el-form-item>
      <br>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="formInline.timeRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <!-- <el-date-picker v-model="form.value1"></el-date-picker>&nbsp;至&nbsp;
        <el-date-picker v-model="form.value2"></el-date-picker> -->
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="onSubmit()">查询</el-button>
          <!-- <el-button @click="resetForm()">重置</el-button> -->
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
        </el-tabs>
      </el-col>
      <el-col :span="3" style="text-align: center;">
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
      <el-col :span="1">
        <el-button icon="el-icon-refresh" circle @click="getList" />
      </el-col>
    </el-row>
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
  import {
    getList
  } from '@/api/request'
  import insertComponent from './insert'
  import updateComponent from './update'
  import deleteComponent from './delete'
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
        activeName: '0',
        options: [],

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
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        const data = {
          ...this.formInline,
          verify: this.activeName==0?'':this.activeName,
          pageNum: this.currentPage
        }
        getList('sys/news/', data,'selectMyNewsList').then(response => {
          const results = response.data
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
      // resetForm(){
      //   this.form={}
      //   this.$refs.form.resetFields();
      //   this.getList()
      // },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getList()
      }
    }
  }
</script>

<style scoped>

</style>
