import request from '@/utils/request'

/**
 * 获取banner列表
 */
export function fetchList() {
  return request({
    url: '/command/banner',
    method: 'get'
  })
}

export function deleteHomeAdvertise(data) {
  return request({
    url: '/command/banner/delete',
    method: 'post',
    data: data
  })
}

/**
 * 获取banner详情
 * @param id
 */
export function getHomeAdvertise(id) {
  return request({
    url: `/command/banner/${id}`,
    method: 'get',
  })
}

/**
 * 更新 banner数据
 * @param data
 */
export function updateHomeAdvertise(data) {
  return request({
    url: '/command/banner',
    method: 'post',
    data: data
  })
}
