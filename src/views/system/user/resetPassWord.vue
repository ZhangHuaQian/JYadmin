<template>
  <div>
    <el-button plain size="small" @click.native="handleEnter">修改密码</el-button>
    <el-dialog :close-on-click-modal="false" title="修改密码" :visible.sync="dialogFormVisible" width="40%" top="7vh">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="再次输入新密码" prop="password2">
          <el-input v-model="form.password2" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleSubmit">确认修改</el-button>
          <el-button type="primary" @click="handleReset">重置密码</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { update, select } from '@/api/request'

export default {
  props: {
    itemid: {
      type: String,
      default: null
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'))
      } else if (value === this.form.oldPassword) {
        callback(new Error('新密码不能与旧密码一致!'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      form: {
        id:this.itemid,
        password:'',
        oldPassword:''
      },
      rules: {
        oldPassword: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        password2: [{ required: true, trigger: 'blur', validator: validatePass2 }]
      }
    }
  },
  methods: {
    handleEnter() {
      if (this.itemid) {
        this.handleSelect()
      } else {
        this.$message.error('系统出错！请刷新重试！')
      }
    },
    handleSelect() {
      const data = { id: this.itemid }
      select('/sys/ucenter', data).then(response => {
        const results = response.data
        this.form.loginname = results.data.loginname
        this.dialogFormVisible = true
      })
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          update('sys/ucenter', this.form, '/updatePwd').then(response => {
            this.dialogFormVisible = false
            this.$emit('refresh')
          })
        } else {
          this.$message('有内容没有填写！')
        }
      })
    },
    handleReset() {
      const data = { id: this.itemid }
      update('/sys/ucenter', data, '/resetPwd').then(response => {
        this.dialogFormVisible = false
        this.$emit('refresh')
      })
    }
  }
}
</script>

<style>
</style>
