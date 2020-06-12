<template>
  <div class="home-container">
    <el-row style="padding:0.2rem 1rem 1rem 1rem;background-color: #fff;">
      <el-col :span="16">
        <h2>你好,欢迎使用网站管理系统</h2>
        <span style="color: #2175bf;font-size: 14px;">当前所在得站点:{{getUserInfo.currentSiteName}}</span>
      </el-col>
      <el-col :span="8" style="text-align: right;padding-top: 1.2rem;">
        <el-row :gutter="20">
          <el-col :span="16" style="text-align: right;">
            <img src="@/assets/dril.png" />
          </el-col>
          <el-col :span="6" style="padding-top: 0.5rem;">
            <el-row style="font-size: 20px;">{{dateStr}}</el-row>
            <el-row :gutter="10" style="font-size: 14px;">
              <el-col :span="12">{{week}}</el-col>
              <el-col :span="12">{{Str}}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="padding: 1rem 0;">
      <el-col :span="8" style="position: relative;">
        <img src="@/assets/lbj.png" />
        <span class="today">今日浏览量（PV）</span>
        <span class="num">{{sitePvUvIp.pageView}}</span>
      </el-col>
      <el-col :span="8" style="position: relative;">
        <img src="@/assets/zbj.png" />
        <span class="today">今日访问量（IP）</span>
        <span class="num">{{sitePvUvIp.ip}}</span>
      </el-col>
      <el-col :span="8" style="position: relative;">
        <img src="@/assets/fwl.png" />
        <span class="today">今日访客量（UV）</span>
        <span class="num">{{sitePvUvIp.uniqueVisitor}}</span>
      </el-col>
    </el-row>
    <el-row style="background-color: #fff;height: 650px;">
      <el-col :span="11" style="border:1px solid #ccc;">
        <salesLeft />
      </el-col>
      <el-col :span="13">
        <el-row style="height:300px;border: 1px solid #ccc;margin: 1rem;">
          <access />
        </el-row>
        <el-row style="border: 1px solid #ccc;margin: 1rem;">
          <salesRight />
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    getList
  } from '@/api/request'
  import transaction from './components/transaction.vue'
  import salesLeft from './components/salesLeft.vue'
  import salesRight from './components/salesRight.vue'
  import access from './components/access.vue'

  export default {
    name: 'Home',
    components: {
      transaction,
      salesLeft,
      salesRight,
      access
    },
    data() {
      return {
        dateStr: '',
        Str:'',
        week:'',
        sitePvUvIp: {},
        getUserInfo: {}
      }
    },
    created() {
      //获取当前时间  年月日  时分秒
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
      var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
      var hours = nowDate.getHours();
      var minute = nowDate.getMinutes();
      var second = nowDate.getSeconds();
      var dateStr = year + "-" + month + "-" + day;
      var Str = hours + ":" + minute + ":" + second;
      this.dateStr = dateStr;
      this.Str=Str;

      // 获取星期几
      var now = new Date();
      var day = now.getDay();
      var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
      var week = weeks[day];
      this.week=week;

      this.getList1()
      this.getList2()
    },
    methods: {
      getList1() {
        getList('sys/sitePvUvIp', null, '/view').then(response => {
          const results = response.data
          this.sitePvUvIp = results.data

        })
      },
      getList2() {
        getList('sys/ucenter', null, '/getUserInfo').then(response => {
          const results = response.data
          this.getUserInfo = results.data

        })
      }

    }
  }
</script>

<style lang="scss" scoped>
  .home-container {
    padding: 20px;
    background-color: #eaeaea;

    .echarts {
      width: 100%;
      height: 100%;
    }
  }

  .today {
    position: absolute;
    top: 50%;
    left: 20%;
    margin-top: -10px;
    color: #fff;

  }

  .num {
    position: absolute;
    top: 50%;
    right: 10%;
    margin-top: -23px;
    color: #fff;
    font-size: 40px;
  }
</style>
