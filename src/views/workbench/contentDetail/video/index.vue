<template>
  <el-form ref="form" :model="form" :rules="rules" :disabled="isSelect">
    <el-row :gutter="60">
      <el-col :span="15">
        <el-form-item label="标题名称" label-width="80px" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="副标题" label-width="80px">
          <el-input v-model="form.subTitle	" />
        </el-form-item>
        <el-form-item label="视频类型" label-width="80px" style="text-align: left;">
          <el-radio v-model="radio" :label="1">本地视频</el-radio>
          <el-radio v-model="radio" :label="2">外部链接</el-radio>
        </el-form-item>
        <div v-if="radio===1">
          <el-form-item label="上传视频" label-width="80px" prop="url" style="text-align: left;">
            <videoUpload :set-video="form.url" @handleUpload="getVideo" />
          </el-form-item>
        </div>
        <div v-if="radio===2">
          <el-form-item label="链接地址" label-width="80px" style="text-align: left;">
            <el-input v-model="form.url" />
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
        <el-form-item label="同时发布到" label-width="82px">
          <el-col :span="24" style="text-align: right;padding-right: 0;">
            <el-button :disabled="isInsert||isUpdata">+添加栏目</el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <label>是否banner推荐</label>
          <el-row>
            <el-radio v-model="form.banner" :label="1">是</el-radio>
            <el-radio v-model="form.banner" :label="0">否</el-radio>
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
            <el-input
              v-model="form.remark"
              :disabled="isInsert||isUpdata"
              type="textarea"
              :autosize="{ minRows: 5}"
            />
          </el-row>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item v-if="!isSelect">
      <el-button type="primary" @click="onCancel">取消</el-button>
      <el-button v-if="!verifys" type="primary" @click="onSubmit">提交审核</el-button>
      <el-button v-if="verifys" type="primary" @click="onSubmit">保存</el-button>
      <el-button v-if="!verifys" type="primary" @click="onSave">存在草稿</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import videoUpload from '@/components/upload/video'
import imageUpload from '@/components/upload/image'
import { getList } from '@/api/request'
export default {
  components: {
    videoUpload,
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
    },
    isInsert:{
      type: Boolean,
      default: false
    },
    isUpdata:{
      type: Boolean,
      default: false
    },
    getVerifyform:{
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
      radio:1,
      form: {
        columnIds:[],
        url:'',
        verify: '',
        banner:0
      },
      rules: {
        title: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        url: [{ required: true, message: '请填写内容', trigger: 'blur' }]
      },
      options: [
        {
          value: 'id',
          label: 'name',
        }
      ],
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
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    if (this.getform) {
      this.form = this.getform
      this.form.columnIds.splice(0,1)
    }
    if(this.getVerifyform){
      this.form=this.getVerifyform
      // this.form.columnIds=[this.getVerifyform.idList]
      console.log(this.form)
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      const data = {
        ...this.formInline,
        pageNum: this.currentPage
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
            type: 3,
            newsId:this.form.id
          }
          this.$emit('onSubmit', form)
        } else {
          this.$message('有内容没有填写！')
        }
      })
    },
    onSave(){
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.columnIds=[this.form.columnIds.pop()]
          const form = {
            ...this.form,
            verify: 1,
            type: 3
          }
          this.$emit('onSave', form)
        }
      })
    },
    onCancel() {
      this.$emit('onClose')
    },

    getVideo(url) {
      console.log(url)
      this.form.url = url
    },
    getImg(url) {
      this.form.image = url
    },
  }
}
</script>

<style scoped>

</style>
