<template>
  <el-form ref="form" :model="form" :rules="rules" :disabled="isSelect" label-width="120px">
    <el-form-item label="组织名称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
   <el-form-item label="组织类型" style="text-align: left;">
      <el-select v-model="form.organizationId" placeholder="请选择" style="width: 50%;">
        <el-option
          v-for="item in optionsType"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="上层部门" style="text-align: left;" prop="pId">
      <el-cascader
        style="width: 50%;"
        v-model="form.pId"
        :options="options"
        :props="{value: 'id', label: 'name', children: 'child'}"
        >
      </el-cascader>
    </el-form-item>
    <el-form-item label="负责人">
      <el-input v-model="form.principal" />
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input v-model="form.principalTel" />
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
        name:'',
        organizationId:'',
        pId:[],
        principal:'',
        principalTel:'',
        introduce:''
      },
      rules: {
        name: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        pId: [{ required: true, message: '请填写内容', trigger: 'blur' }],
      },
      options: [],
      optionsType: []
    }
  },
  created() {
    this.getOptionsList()
    this.getOptionsListType()
  },
  mounted() {
    if (this.getform) {
      this.form = this.getform
      this.form.pId = this.getform.idList
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.pId=this.form.pId[this.form.pId.length-1]
          this.$emit('onSubmit', this.form)
        } else {
          this.$message('有内容没有填写！')
        }
      })
    },
    getOptionsListType() {
      const data = {
        openPage: 0
      }
      getList('sys/organization/', data,'selectList').then(response => {
        const results = response.data
        this.optionsType = results.data.data
      })
    },

    getOptionsList() {
      const data = {
        openPage: 0
      }
      getList('sys/department/', data,'treeList').then(response => {
        const results = response.data
        this.options = results.data
      })
    },
    onCancel() {
      this.$emit('onClose')
    }
  }
}
</script>

<style scoped>

</style>
