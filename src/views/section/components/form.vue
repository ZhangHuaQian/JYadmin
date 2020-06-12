<template>
  <el-form ref="form" :model="form" :rules="rules" :disabled="isSelect" label-width="120px">
    <el-form-item label="父栏目名称" prop="pId">
      <el-cascader
        style="width: 100%;"
        v-model="form.pId"
        :options="optionsList"
        :props="{value: 'id', label: 'name', children: 'child',checkStrictly: true}"
        @change="handleChange"
      />
    </el-form-item>
    <el-form-item label="栏目名称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="栏目类型" prop="typeId" style="text-align: left;">
      <el-select v-model="form.typeId" placeholder="请选择" style="width: 50%;">
        <el-option
          v-for="item in typeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="是否最终栏目" prop="finalColumn" style="text-align: left;">
      <el-radio v-model="form.finalColumn" :label="1">是</el-radio>
      <el-radio v-model="form.finalColumn" :label="0">否</el-radio>
    </el-form-item>
    <el-form-item v-if="form.typeId==1" label="访问路径" prop="url">
      <el-row>
        <el-col :md="22">
          <el-input v-model="form.url" />
        </el-col>
        <el-col :md="2">
          <el-button v-model="form.url" @click="shengC">生成</el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item v-if="form.typeId==1" label="关联站点" prop="relevanceSiteId" style="text-align: left;">
      <el-select v-model="form.relevanceSiteId" placeholder="请选择" style="width: 50%;">
        <el-option
          v-for="item in relevanceSiteIds"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-if="form.typeId==4" label="链接地址">
      <el-input v-model="form.url" />
      </el-row>
    </el-form-item>
    <el-form-item v-if="form.typeId==1||form.typeId==4" label="栏目简介">
        <el-input
          v-model="form.introduce"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 8}"
          placeholder="请输入内容"
        />
    </el-form-item>
    <el-form-item v-if="form.typeId==2||form.typeId==3" label="栏目banner图片" style="text-align: left;">
      <imageUpload :geturl="form.banner" @getImage="getBanner" />
      <template>
        <el-checkbox v-model="form.checked1">将栏目图片应用到所有子栏目</el-checkbox>
      </template>
    </el-form-item>
    <el-form-item v-if="form.typeId==2" label="logo图片" style="text-align: left;">
      <imageUpload :geturl="form.logo" @getImage="getLogo" />
      <template>
        <el-checkbox v-model="form.checked2">将栏目图片应用到所有子栏目</el-checkbox>
      </template>
    </el-form-item>
    <el-form-item v-if="form.typeId==2" label="列表页显示条数" style="width: 20%;">
      <el-input v-model="form.pageLimit" />
    </el-form-item>
    <el-form-item label="目标窗口" style="text-align: left;">
      <el-radio v-model="form.targetWindow" :label="1">本窗口</el-radio>
      <el-radio v-model="form.targetWindow" :label="2">新窗口</el-radio>
    </el-form-item>

    <!--信息页面、单页面  模板 -->
    <el-form-item v-if="form.typeId==2" label="列表页模板" style="text-align: left;">
      <el-select v-model="form.columnModelId" placeholder="请选择" style="width: 85%;">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button v-model="form.columnUseToSub" @click="isplayToSub">应用到子栏目</el-button>
    </el-form-item>
    <el-form-item v-if="form.typeId==2" label="文章详情页模板" style="text-align: left;">
      <el-select v-model="form.newsDetailModelId" placeholder="请选择" style="width: 85%;">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button v-model="form.newsDetailUseToSub" @click="isplayToSub">应用到子栏目</el-button>
    </el-form-item>

    <el-form-item v-if="form.typeId==3" label="栏目模板" style="text-align: left;">
      <el-select v-model="form.columnModelId" placeholder="请选择" style="width: 85%;">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button v-model="form.columnUseToSub" @click="isplayToSub">应用到子栏目</el-button>
    </el-form-item>
    <el-form-item v-if="form.typeId==3" label="内容详情页模板" style="text-align: left;">
      <el-select v-model="form.newsDetailModelId" placeholder="请选择" style="width: 85%;">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button v-model="form.newsDetailUseToSub" @click="isplayToSub">应用到子栏目</el-button>
    </el-form-item>
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
        typeId: 1,
        pId:[],
        banner:'',
        logo:'',
        checked1:false,
        checked2:false
      },
      rules: {
        id: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        name: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        typeId: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        finalColumn: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        url: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        relevanceSiteId: [{ required: true, message: '请填写内容', trigger: 'blur' }]
      },
      options: [],
      relevanceSiteIds:[],
      typeList:[],
      optionsList:[]
    }
  },
  created() {
    if (this.getform) {
      this.form = this.getform
      this.form.pId = [this.form.pId]
    }
    this.getOptionsList()
    this.getOptionsList2()
    this.getOptionsList3()
    this.getOptionsList4()
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
      getList('sys/column/', data,'selectList').then(response => {
        const results = response.data
        this.options = results.data
      })
    },
    getOptionsList2() {
      const data = {
        openPage: 0,
        code:'COLUMN'
      }
      getList('sys/dictionary/', data,'selectByCode').then(response => {
        const results = response.data
        this.typeList = results.data.data
      })
    },
    getOptionsList3() {
      const data = {
        openPage: 0,
      }
      getList('sys/site/', data,'getCurrentSiteAndChildren').then(response => {
        const results = response.data
        this.relevanceSiteIds = results.data
      })
    },
    getOptionsList4() {
      const data = {
        openPage: 0,
      }
      getList('sys/column/', data,'selectList').then(response => {
        const results = response.data
        this.optionsList = results.data
      })
    },
    getBanner(url) {
      this.form.banner = url
    },
    getLogo(url){
      this.form.logo = url
    },
    isplayToSub() {
      console.log('应用')
    },
    shengC(){
      console.log('生成')
    },
    onCancel() {
      this.$emit('onClose')
    },
    handleChange(value) {
    },
  }
}
</script>

<style scoped>
.logo{
  width: 100%;
}
</style>
