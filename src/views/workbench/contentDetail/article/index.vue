<template>
  <el-form ref="form" :model="form" :rules="rules" :disabled="isSelect">
    <el-row :gutter="60">
      <el-col :span="15">
        <el-form-item label="标题名称" label-width="80px" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="副标题" label-width="80px">
          <el-input v-model="form.subTitle" />
        </el-form-item>
        <el-form-item label="标题新闻" label-width="80px" prop="type" style="text-align: left;">
          <el-row>
            <el-col :span="4">
              <el-radio @change='changeisShow1' v-model="form.type" :label="2">否</el-radio>
              <el-radio @change='changeisShow2' v-model="form.type" :label="1">是</el-radio>
            </el-col>
            <el-col v-if="form.type===1" :span="18">
             <el-row>
                <el-col style="display: flex;">
                  <link2content style="margin-right: 10px;" />
                  <link2section style="margin-right: 10px;" @getUrl="geturl" />
                  <el-button class="bg-purple">外部地址</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-if="form.type===2">
          <el-col :md="12" style="padding-left: 0;">
            <el-form-item label="发布人" label-width="80px">
              <el-input :disabled="isInsert||isUpdata" :value="name" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item v-if="form.type===1" label="链接地址" label-width="80px">
          <el-input v-model="form.url" :value="form.url" />
        </el-form-item>
        <div v-if="form.type===2">
          <el-form-item label="内容详情" label-width="80px" prop="content">
            <Tinymce ref="editor" v-model="form.content" :height="500" />
          </el-form-item>
          <el-form-item label="上传附件" label-width="80px" style="text-align: left;">
            <fileUpload :setFiles="form.accessory" @handleUpload="getFiles" />
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="9" style="border-left: 1px solid silver;text-align: left;">
        <el-form-item style="margin-bottom: 0;">
          <label>封面图片</label>
          <el-row>
            <imageUpload :geturl="form.image" @getImage="getImg" />
          </el-row>
        </el-form-item>
       <el-form-item>
          <label>发布栏目</label>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-input :value="options[0].name" />
            </el-col>
            <el-col :span="16">
              <el-cascader
                style="width: 100%;"
                v-model="form.columnIds"
                :options="options[0].child"
                :props="{value: 'id', label: 'name', children: 'child'}"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
              required: true, message: '栏目不能为空', trigger: 'blur'
            }"
        >
          <label v-if="!index">发布栏目</label>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-input :value="options[0].name" />
            </el-col>
            <el-col :span="12">
              <el-cascader
                style="width: 100%;"
                v-model="form.columnIds"
                :options="options[0].child"
                :props="{value: 'id', label: 'name', children: 'child'}"
                @change="handleChange"
              />
            </el-col>

            <el-col :span="2">
              <el-button v-if="index>0" @click.prevent="removeDomain(domain)">删除</el-button>
            </el-col>

          </el-row>
        </el-form-item> -->
        <!-- 添加栏目 -->
        <el-form-item label="同时发布到" label-width="82px">
          <el-col :span="24" style="text-align: right;padding-right: 0;">
            <el-button  @click="addDomain" :disabled="isInsert||isUpdata">+添加栏目</el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <label>是否banner推荐</label>
          <el-row>
            <el-radio v-model="form.banner" :label="1">推荐</el-radio>
            <el-radio v-model="form.banner" :label="0">不推荐</el-radio>
          </el-row>
        </el-form-item>
        <el-form-item>
          <label>资讯状态</label>
          <el-row>
            <el-select v-model="form.verify" placeholder="待审核">
              <el-option :disabled="isInsert||isUpdata" v-for="item in optionsStatus" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
          </el-row>
        </el-form-item>
        <el-form-item>
          <label>审核说明</label>
          <el-row>
            <el-input v-model="form.remark" :disabled="isInsert||isUpdata" type="textarea" :autosize="{ minRows: 5}" />
          </el-row>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item v-if="!isSelect">
      <el-button type="primary" @click="onCancel">取消</el-button>
      <el-button v-if="!verifys" type="primary" @click="onSubmit">提交审核</el-button>
      <el-button v-if="verifys" type="primary" @click="onSubmit">保存</el-button>
      <!-- <el-button v-if="verifys" type="primary" @click="onSubmit2(dynamicValidateForm)">保存</el-button> -->
      <el-button v-if="!verifys" type="primary" @click="onSave">存在草稿</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {
    getList
  } from '@/api/request'
  import fileUpload from '@/components/upload/files'
  import imageUpload from '@/components/upload/image'
  import Tinymce from '@/components/Tinymce'
  import link2content from './components/link2content'
  import link2section from './components/link2section'
  export default {
    components: {
      fileUpload,
      imageUpload,
      Tinymce,
      link2content,
      link2section
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
    props: {
      getform: {
        type: Object,
        default: null
      },
      isSelect: {
        type: Boolean,
        default: false
      },
      isInsert:{
        type: Boolean,
        default: false
      },
      isUpdata:{
        type: Boolean,
        default: false
      },
      getVerifyform:{   //审核
        type:Object,
        default:null
      },
      verifys:{
        type:Number,
        default:null
      }
    },
    data() {
      return {
        isShow:false,
        options: [
          {
            value: 'id',
            label: 'name',
          }
        ],
        form: {
          // value:{},
          title:'',
          subTitle:'',
          type:2,
          content:'',
          accessory:'',
          image:'',
          banner:0,
          verify: '',
          columnIds:[],
          accessory:'',
          url:'',
          idList:[]
        },
        rules: {
          title: [{
            required: true,
            message: '请填写标题名称',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '请选择新闻',
            trigger: 'blur'
          }],
          content: [{
            required: true,
            message: '请填写内容',
            trigger: 'blur'
          }]
        },
        optionsStatus: [{
          value: 1,
          name: '草稿'
        }, {
          value: 2,
          name: '待审核'
        }, {
          value: 3,
          name: '已通过'
        }, {
          value: 4,
          name: '已退稿'
        }, {
          value: 5,
          name: '已发布'
        }],
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
        }


      }
    },
    computed: {
        ...mapGetters([
          'name'
        ])
    },
    created() {
      if (this.getform) {
        this.form = this.getform
      }
      if(this.getVerifyform){
        this.form=this.getVerifyform
        // this.form.idList=[this.getVerifyform.idList]
        console.log(this.form)

      }
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        const data = {
          ...this.formInline,
          pageNum: this.currentPage,
        }
        getList('sys/column/', data,'selectList').then(response => {
          const results = response.data
          this.options = results.data
          this.listLoading = false
        })
      },
      onSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.form.columnIds=[this.form.columnIds.pop()]
            const form = {
              ...this.form,
              verify: this.form.verify || 2,
              newsId:this.form.id
            }
            this.$emit('onSubmit', form)
          } else {
            this.$message('有内容没有填写！')
          }
        })
      },
      // onSubmit2(form) {
      //   this.$refs.form.validate(valid => {
      //     if (valid) {
      //       this.form.columnIds=[this.form.columnIds.pop()]
      //       const form = {
      //         ...this.form,
      //         verify: this.form.verify || 2,
      //         newsId:this.form.id
      //       }
      //       this.$emit('onSubmit', form)
      //     } else {
      //       this.$message('有内容没有填写！')
      //     }
      //   })
      // },
      onSave(){
        this.$refs.form.validate(valid => {
          if (valid) {
            this.form.columnIds=[this.form.columnIds.pop()]
            const form = {
              ...this.form,
              verify: 1
            }
            this.$emit('onSave', form)
          }
        })
      },
      onCancel() {
        this.$emit('onClose')
      },
      changeisShow1() {
        this.isShow = false
      },
      changeisShow2() {
        this.isShow = true
      },
      handleChange(value) {
      },
      getFiles(filesList) {
        this.form.accessory = filesList
      },
      getImg(url) {
        this.form.image = url
      },
      geturl(url){
        this.form.url=url
      },
      //删除
      removeDomain(item) {
        // var index = this.dynamicValidateForm.domains.indexOf(item)
        // if (index !== -1) {
        //   this.dynamicValidateForm.domains.splice(index, 1)
        // }
      },
      //新增
      addDomain() {
        // this.dynamicValidateForm.domains.push({
        //   value: '',
        //   key: Date.now()
        // });
      }

    }
  }
</script>

<style scoped>
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
      border-radius: 2px;
      min-height: 36px;
    }
</style>
