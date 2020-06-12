import '@/utils/interception'
import { serverip as ip } from '@/utils/serverIP'
import axios from 'axios'
import Qs from 'qs'

//获取栏目列表
export function getColumnList(name, data, jiekou) {
  if (!jiekou) {
    jiekou = '/column/selectList'
  }
  return axios({
    url: ip + name + jiekou,
    method: 'post',
    data: data
  })
}

