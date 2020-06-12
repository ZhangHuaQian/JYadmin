<template>
  <el-form ref="form" :model="form" :rules="rules" :disabled="isSelect" label-width="120px">
    <el-form-item label="父级站点" prop="pId">
      <el-cascader
        style="width: 100%;"
        v-model="form.pId"
        :options="options"
        :props="{value: 'id', label: 'name', children: 'child',checkStrictly: true}"
      />
    </el-form-item>
    <el-form-item label="站点名称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="组织类型" prop="organizationId" style="text-align: left;">
      <el-select v-model="form.organizationId" placeholder="请选择" style="width: 50%;">
        <el-option
          v-for="item in typeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
  <!--  <el-form-item label="站点logo" prop="logo" style="text-align: left;">
      <imageUpload :geturl="form.logo" @getImage="getLogo" />
    </el-form-item> -->
    <!-- 站点模板有问题 -->
    <el-form-item label="站点模板" prop="modelId" style="text-align: left;">
      <el-select v-model="form.modelId" placeholder="请选择" style="width: 50%;">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
   <!-- <el-form-item label="站点描述">
      <el-input
        v-model="form.introduce"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 8}"
        placeholder="请输入内容"
      />
    </el-form-item>
    <el-form-item label="页面背景" style="text-align: left;">
      <imageUpload :geturl="form.backgroundImage" @getImage="getBG" />
    </el-form-item>
    <el-form-item label="站点域名">
      <el-input v-model="form.url" />
    </el-form-item>
    <el-form-item label="版权信息">
      <el-input v-model="form.copyright" />
    </el-form-item>
    <el-form-item label="底部内容">
      <el-input
        v-model="form.bottomContent"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 8}"
        placeholder="请输入内容"
      />
    </el-form-item>
    <el-form-item label="底部背景图片" style="text-align: left;">
      <imageUpload :geturl="form.bottomImage" @getImage="getBottomBG" />
    </el-form-item> -->
    <el-form-item v-if="!isSelect" style="text-align: left;">
      <el-button type="primary" @click="onSubmit">确认</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import imageUpload from '@/components/upload/image'
import { getList } from '@/api/request'
export default {
  components: {
    imageUpload
  },
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
      form: {
        pId:'',
        name:'',
        organizationId:'',
        modelId:''
      },
      rules: {
        pId: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        name: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        organizationId: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        modelId: [{ required: true, message: '请填写内容', trigger: 'blur' }]
      },
      options: [],
      typeList:[]
    }
  },
  mounted() {
    if (this.getform) {
      this.form = this.getform
      this.form.pId=[this.form.pId]

    }
    this.getOptionsList()
    this.getOptionsList2()
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.pId=this.form.pId.pop()
          this.$emit('onSubmit', this.form)
        } else {
          this.$message('有内容没有填写！')
        }
      })
    },
    getOptionsList() {
      const data = {
        openPage: 0
      }
      getList('sys/site/', data,'getCurrentSiteAndChildrenTree').then(response => {
        const results = response.data
        this.options = results.data
      })
    },
    getOptionsList2() {
      const data = {
        openPage: 0
      }
      getList('sys/organization/', data,'selectList').then(response => {
        const results = response.data
        this.typeList = results.data.data
      })
    },
    getLogo(url) {
      this.form.logo = url
    },
    getBG(url) {
      this.form.backgroundImage = url
    },
    getBottomBG(url){
      this.form.bottomImage = url
    },
    onCancel() {
      this.$emit('onClose')
    }
  }
}
</script>

<style scoped>

</style>
