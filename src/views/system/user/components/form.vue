<template>
  <el-form ref="form" :model="form" :rules="rules" :disabled="isSelect" label-width="120px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="登录账号" prop="loginName">
      <el-input v-model="form.loginName" />
    </el-form-item>
    <el-form-item v-if="!isSelect" label="登录密码" prop="password">
      <el-input v-model="form.password" />
    </el-form-item>
    <el-form-item label="部门id" prop="deptId" style="text-align: left;">
      <el-select v-model="form.deptId" placeholder="请选择" style="width: 50%;">
        <el-option
          v-for="item in deptIdArr"
          :key="item.id"
          :label="item.deptId"
          :value="item.deptId"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="角色" style="text-align: left;">
      <el-checkbox-group v-model="form.roleIds" @change="roleSelect">
        <el-checkbox v-for="item in roleArr" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="可管理站点" style="text-align: left;">
      <el-checkbox-group v-model="form.siteIds" @change="departmentSelect">
        <el-checkbox v-for="item in manageableSiteArr" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="默认管理站点" prop="defaultSiteId" style="text-align: left;">
      <el-select v-model="form.defaultSiteId" placeholder="请选择" style="width: 50%;" @change="departmentSelect">
        <template v-for="item1 in form.siteIds">
          <template v-for="item2 in manageableSiteArr">
            <el-option
              v-if="item1 === item2.id"
              :key="item2.id"
              :label="item2.name"
              :value="item2.id"
            />
          </template>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="简介">
      <el-input
        v-model="form.introduce"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 8}"
        placeholder="请输入内容"
      />
    </el-form-item>
    <el-form-item v-if="!isSelect" style="text-align: left;">
      <el-button type="primary" @click="onSubmit">确认</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ip } from '@/api/upload.js'
import { getList } from '@/api/request'
export default {
  props: {
    getform: {
      type: Object,
      default: null
    },
    isSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ip: ip,
      form: {
        name: '',
        loginName:'',
        deptId:'',
        roleIds: [],
        siteIds:[],
        defaultSiteId:'',
        introduce:''
      },
      rules: {
        name: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        loginName: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        password: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        defaultSiteId: [{ required: true, message: '请填写内容', trigger: 'blur' }]
      },
      roleArr:[],   // 角色
      deptIdArr:[],  //所属组织
      manageableSiteArr:[],  // 可管理站点
    }
  },
  mounted() {
    if (this.getform) {
      this.form = this.getform
    }
    this.getOptionsList1()
    this.getOptionsList2()
    this.getOptionsList3()
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('onSubmit', this.form)
        } else {
          this.$message('有内容没有填写！')
        }
      })
    },
    getOptionsList1() {
      const data = {
        openPage: 0
      }
      getList('sys/role', data).then(response => {
        const results = response.data
        this.roleArr = results.data.data
      })
    },
    getOptionsList2() {
      const data = {
        openPage: 0
      }
      getList('sys/ucenter', data).then(response => {
        const results = response.data
        this.deptIdArr = results.data.data
      })
    },
    getOptionsList3() {
      const data = {
        openPage: 0
      }
      getList('sys/site/', data,'getCanManageSiteList').then(response => {
        const results = response.data
        this.manageableSiteArr=results.data
      })
    },
    roleSelect(value) {
      // for (var i = 0; i < this.roleArr.length; i++) {
      //   if (this.roleArr[i].name === value) {
      //     this.form.roleIds = this.roleArr[i].id
      //   }
      // }

    },
    departmentSelect(value) {
    },
    onCancel() {
      this.$emit('onClose')
    }
  }
}
</script>

<style scoped>

</style>
