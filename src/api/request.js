import '@/utils/interception'
import { serverip as ip } from '@/utils/serverIP'
import axios from 'axios'
import Qs from 'qs'

//获取列表
export function getList(name, data, jiekou) {
  if (!jiekou) {
    jiekou = '/selectList'
  }
  return axios({
    url: ip + name + jiekou,
    method: 'post',
    data: data
  })
}

//获取待审核资讯列表
export function getverifyList(name, data, jiekou) {
  if (!jiekou) {
    jiekou = '/news/verifyList'
  }
  return axios({
    url: ip + name + jiekou,
    method: 'post',
    data: data
  })
}

//添加
export function insert(name, form, jiekou) {
  if (!jiekou) {
    jiekou = '/insert'
  }
  return axios({
    url: ip + name + jiekou,
    method: 'post',
    data: form
    // data: form.json?form:Qs.stringify(form)
  })
}

export function update(name, data, jiekou) {
  if (!jiekou) {
    jiekou = '/update'
  }
  return axios({
    url: ip + name + jiekou,
    method: 'post',
    data:data
    // data: data.json?data:Qs.stringify(data)
  })
}

// 查询
export function select(name, data, jiekou) {
  if (!jiekou) {
    jiekou = '/select'
  }
  return axios({
    url: ip + name + jiekou,
    method: 'post',
    data: data
  })
}


export function Delete(name, id, jiekou) {
  if (!jiekou) {
    jiekou = '/delete'
  }
  return axios({
    url: ip + name + jiekou,
    method: 'post',
    data:{id}
    // data: Qs.stringify({ id })
  })
}

export function downloadFiles(url) {
  return axios({
    url: url,
    method: 'get',
    responseType: 'blob'
  })
}
