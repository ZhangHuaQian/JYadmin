<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- <el-tab-pane label="用户列表" name="first">
          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            stripe
            fit
            :highlight-current-row="true"
          >
            <el-table-column align="center" label="序号" width="65">
              <template v-slot="scope">
                {{ scope.$index+1+(currentPage-1)*10 }}
              </template>
            </el-table-column>
            <el-table-column label="用户姓名">
              <template v-slot="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="登陆账号">
              <template v-slot="scope">
                {{ scope.row.loginName }}
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
                        查看类型
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
        </el-tab-pane> -->
        <el-row type="flex" class="row-bg" justify="end" style="margin-bottom: 10px;">
          <el-button type="primary" size="mini" @click="onSubmit">确定</el-button>
        </el-row>
        <el-tab-pane label="功能权限" name="second">
          <div style="padding: 10px;border: 1px solid #eaeaea;">
            <el-tree
              ref="tree"
              :data="data"
              show-checkbox
              node-key="id"
              :default-expand-all="true"
              :default-checked-keys="checkedList"
              :props="defaultProps"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import { getList } from '@/api/request'
import updateComponent from './update.vue'
import deleteComponent from './delete.vue'
import selectComponent from './select'
export default {
  components: {
    updateComponent,
    deleteComponent,
    selectComponent,
  },
  // props: {
  //   checkedItem: {
  //     type: Object,
  //     default: null
  //   }
  // },
  data() {
    return {
      checkedItem: {},
      listLoading: true,
      list:[],
      checkedList: [],
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 10, // 每页的数据条数
      activeName: 'second',
      data: [],
      defaultProps: {
        children: 'child',
        label: 'label'
      },
      menuIds:[]
    }
  },
  created() {
    this.getAllMenu()
  },
  methods: {
    getCheckedItem(item) {
      this.checkedItem = item
      this.getUserMenu()
    },
    getAllMenu(data) {
      getList('sys/menu', data, '/selectAll').then(response => {
        const results = response.data
        this.data = results.data
      })
    },
    getUserMenu() {
      const data = {
        roleId: this.checkedItem.id
      }
      getList('sys/menu', data, '/selectByRoleId').then(response => {
        const results = response.data
        console.log(results)
        var checkedList = []
        for (var i = 0; i < results.data.length; i++) {
          if (results.data[i].menuType.toString() === '1') {
            checkedList.push(results.data[i].id)
            this.menuIds.push(results.data[i].id)
          }
        }
        this.checkedList = checkedList
        this.$refs.tree.setCheckedKeys(this.checkedList)
      })
    },
    onSubmit() {
      this.$confirm('是否确认保存？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id: this.checkedItem.id,
          menuIds: this.menuIds
        }
        insert('sys/role/updateRoleMenu', data).then(response => {
          window.location.reload()
        })
      }).catch(() => {
        console.log('取消操作')
      })
    },






    refresh() {
      this.$refs.leftTable.getList()
    },
    //用户列表
    getList() {
      this.listLoading = true
      const data = {
        page: this.currentPage
      }
      getList('sys/ucenter/', data,'selectList').then(response => {
        const results = response.data
        this.currentPage = results.data.pageNum
        this.total = results.data.count
        this.list = results.data.data
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  }
}
</script>

<style scoped>
  /deep/ .el-tabs__item{
    font-size: 16px;
    font-weight:bold;
    line-height: 50px;
    }
</style>
