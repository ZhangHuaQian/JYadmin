<template>
  <VChart :options="polar" style="padding: 1rem;background-color: #fff;" />
</template>

<script>
import { getList } from '@/api/request'
import VueECharts from 'vue-echarts'
import 'echarts'

export default {
  components: {
    VChart: VueECharts
  },
  data() {
    return {
      polar :{
          title: {
              text: '近一周访问量统计',
              textStyle:{
                fontSize:16
              }

          },
          tooltip: {
              trigger: 'axis',
          },
          legend: {
              data: ['PV', 'UV', 'IP'],
              left: 'right',
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
          },
          xAxis: {
              type: 'category',
              // boundaryGap: false,
              data: [],
              axisLabel:{rotate: 50},

          },
          yAxis: {
              type: 'value',
              splitLine:{
                lineStyle:{
                  type:'dashed'
                }
              },
          },
          series: [
              {
                  name: 'PV',
                  type: 'line',
                  smooth: true,
                  stack: '总量',
                  data: [],
                  lineStyle:{
                    color:'#fb4d4b'
                  }
              },
              {
                  name: 'UV',
                  type: 'line',
                  smooth: true,
                  stack: '总量',
                  data: [],
                  lineStyle:{
                    color:'#faad14'
                  }
              },
              {
                  name: 'IP',
                  type: 'line',
                  smooth: true,
                  stack: '总量',
                  data: [],
                  lineStyle:{
                    color:'#267af0'
                  }
              },

          ]
      }

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getList('sys/sitePvUvIp', null, '/statisticsByWeek').then(response => {
        const results = response.data
        for (var i = 0; i < results.data.length; i++) {
          this.polar.xAxis.data.push(results.data[i].formatDate)
          this.polar.series[0].data.push(results.data[i].pageView)
          this.polar.series[1].data.push(results.data[i].uniqueVisitor)
          this.polar.series[2].data.push(results.data[i].ip)
        }
      })
    }
  }
}
</script>

<style>
</style>
