<template>
  <el-form ref="form" :model="form" :rules="rules" :disabled="isSelect" label-width="120px">
    <el-form-item label="用户姓名" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="登陆账号" prop="loginName" style="text-align: left;">
      <el-input v-model="form.loginName" />
    </el-form-item>
    <el-form-item label="用户角色" prop="roleIds" style="text-align: left;">
      <el-checkbox-group v-model="form.roleIds" @change="handleCheckedRoleChange">
        <el-checkbox
          v-for="role in rolesArr"
          :label="role.id"
          :key="role.id">{{role.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  <!--  <el-form-item v-show="false">
      <el-checkbox-group v-model="form.roleIds">
      </el-checkbox-group>
    </el-form-item> -->
    <el-form-item label="用户简介" prop="introduce">
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
        name:'',
        weight:'',
        permission:'',
        introduce:'',
        roleArray:[],
        roleIds:[]
      },
      rolesArr:[],
      rules: {
        name: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        loginName: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        roleIds: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        introduce: [{ required: true, message: '请填写内容', trigger: 'blur' }],
      }
    }
  },
  mounted() {
    this.getList()
    if (this.getform) {
      this.form = this.getform
    }

  },
  methods: {
    getList() {
      const data = {
        openPage: 0
      }
      getList('sys/role', data).then(response => {
        const results = response.data
        this.rolesArr = results.data.data
      })
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('onSubmit', this.form)
        } else {
          this.$message('有内容没有填写！')
        }
      })
    },
    onCancel() {
      this.$emit('onClose')
    },
    handleCheckedRoleChange(value) {
      console.log(value)

    }
  }
}
</script>

<style scoped>

</style>
